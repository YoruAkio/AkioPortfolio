import { NextResponse } from "next/server";

// @note project interface for type safety
interface Project {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: { name: string } | null;
  topics: string[];
}

// @note simple in-memory cache
let cache: {
  data: { projects: Project[]; source: string; count: number } | null;
  timestamp: number | null;
  ttl: number;
} = {
  data: null,
  timestamp: null,
  ttl: 30 * 60 * 1000, // 30 minutes
};

// @note graphql query for pinned repositories
const PINNED_REPOS_QUERY = `
  query GetPinnedRepositories($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            name
            description
            url
            homepageUrl
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
            repositoryTopics(first: 10) {
              nodes {
                topic {
                  name
                }
              }
            }
            isPrivate
            isFork
          }
        }
      }
    }
  }
`;

export async function GET() {
  // @note check cache
  const now = Date.now();
  if (cache.data && cache.timestamp && now - cache.timestamp < cache.ttl) {
    return NextResponse.json({
      ...cache.data,
      cached: true,
      cacheAge: Math.floor((now - cache.timestamp) / 1000),
    });
  }

  try {
    let projects: Project[] = [];
    let usingPinned = false;

    // @note try graphql for pinned repos first
    if (process.env.GITHUB_TOKEN) {
      try {
        const response = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: PINNED_REPOS_QUERY,
            variables: { username: "YoruAkio" },
          }),
        });

        if (response.ok) {
          const data = await response.json();

          if (!data.errors && data.data?.user?.pinnedItems?.nodes) {
            const pinnedRepos = data.data.user.pinnedItems.nodes
              .filter((repo: { isFork: boolean; isPrivate: boolean }) => !repo.isFork && !repo.isPrivate)
              .map((repo: {
                name: string;
                description: string | null;
                url: string;
                homepageUrl: string | null;
                stargazerCount: number;
                forkCount: number;
                primaryLanguage: { name: string } | null;
                repositoryTopics: { nodes: { topic: { name: string } }[] } | null;
              }) => ({
                name: repo.name,
                description: repo.description,
                url: repo.url,
                homepageUrl: repo.homepageUrl,
                stargazerCount: repo.stargazerCount,
                forkCount: repo.forkCount,
                primaryLanguage: repo.primaryLanguage,
                topics: repo.repositoryTopics?.nodes?.map((n) => n.topic.name) || [],
              }));

            if (pinnedRepos.length > 0) {
              projects = pinnedRepos;
              usingPinned = true;
            }
          }
        }
      } catch (err) {
        console.log("GraphQL fetch failed, falling back to REST:", err);
      }
    }

    // @note fallback to REST API
    if (projects.length === 0) {
      const response = await fetch(
        "https://api.github.com/users/YoruAkio/repos?sort=updated&per_page=6",
        {
          headers: process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {},
        }
      );

      if (!response.ok) {
        throw new Error(`REST API failed: ${response.status}`);
      }

      const repos = await response.json();

      projects = repos
        .filter((repo: { fork: boolean; private: boolean }) => !repo.fork && !repo.private)
        .slice(0, 6)
        .map((repo: {
          name: string;
          description: string | null;
          html_url: string;
          homepage: string | null;
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          topics: string[];
        }) => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          homepageUrl: repo.homepage,
          stargazerCount: repo.stargazers_count,
          forkCount: repo.forks_count,
          primaryLanguage: repo.language ? { name: repo.language } : null,
          topics: repo.topics || [],
        }));
    }

    const responseData = {
      projects,
      source: usingPinned ? "pinned" : "latest",
      count: projects.length,
    };

    // @note cache response
    cache.data = responseData;
    cache.timestamp = Date.now();

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("GitHub API error:", error);

    // @note fallback data
    return NextResponse.json({
      projects: [],
      source: "error",
      count: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
