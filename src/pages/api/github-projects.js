// @note simple in-memory cache for GitHub projects
let cache = {
  data: null,
  timestamp: null,
  ttl: 30 * 60 * 1000, // 30 minutes cache
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // @note check if we have valid cached data
  const now = Date.now();
  if (cache.data && cache.timestamp && (now - cache.timestamp) < cache.ttl) {
    console.log('Serving GitHub projects from cache');
    return res.status(200).json({
      ...cache.data,
      cached: true,
      cacheAge: Math.floor((now - cache.timestamp) / 1000),
    });
  }

  try {
    // @note first attempt to fetch pinned repositories using GraphQL
    const pinnedQuery = `
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
                createdAt
                updatedAt
                isPrivate
                isFork
              }
            }
          }
        }
      }
    `;

    let projects = [];
    let usingPinned = false;

    // @note try to fetch pinned repositories first
    try {
      const pinnedResponse = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: pinnedQuery,
          variables: { username: 'YoruAkio' },
        }),
      });

      if (pinnedResponse.ok) {
        const pinnedData = await pinnedResponse.json();
        
        if (!pinnedData.errors && pinnedData.data?.user?.pinnedItems?.nodes) {
          const pinnedRepos = pinnedData.data.user.pinnedItems.nodes
            .filter(repo => !repo.isFork && !repo.isPrivate)
            .map(repo => ({
              name: repo.name,
              description: repo.description,
              url: repo.url,
              homepageUrl: repo.homepageUrl || null,
              stargazerCount: repo.stargazerCount,
              forkCount: repo.forkCount,
              primaryLanguage: repo.primaryLanguage,
              topics: repo.repositoryTopics?.nodes?.map(node => node.topic.name) || [],
              createdAt: repo.createdAt,
              updatedAt: repo.updatedAt,
              languages: [],
            }));

          if (pinnedRepos.length > 0) {
            projects = pinnedRepos;
            usingPinned = true;
          }
        }
      }
    } catch (pinnedError) {
      console.log('Pinned repositories fetch failed, falling back to latest repos:', pinnedError.message);
    }

    // @note fallback to latest repositories if pinned fetch failed or returned no results
    if (projects.length === 0) {
      const reposResponse = await fetch(
        'https://api.github.com/users/YoruAkio/repos?sort=updated&per_page=6',
        {
          headers: process.env.GITHUB_TOKEN ? {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          } : {},
        }
      );

      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
      }

      const repos = await reposResponse.json();

      // @note filter and format repositories
      projects = repos
        .filter(repo => !repo.fork && !repo.private)
        .slice(0, 6)
        .map(repo => ({
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          homepageUrl: repo.homepage || null,
          stargazerCount: repo.stargazers_count,
          forkCount: repo.forks_count,
          primaryLanguage: repo.language ? { name: repo.language } : null,
          topics: repo.topics || [],
          createdAt: repo.created_at,
          updatedAt: repo.updated_at,
          languages: [],
        }));
    }

    const responseData = {
      projects,
      source: usingPinned ? 'pinned' : 'latest',
      count: projects.length,
    };

    // @note cache the successful response
    cache.data = responseData;
    cache.timestamp = Date.now();
    console.log('GitHub projects cached for 30 minutes');

    res.status(200).json(responseData);

  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    
    // @note fallback to demo data if all API calls fail
    const fallbackProjects = [
      {
        name: 'AkioPortfolio',
        description: 'Modern minimalist portfolio website built with Next.js and Tailwind CSS',
        url: 'https://github.com/YoruAkio/AkioPortfolio',
        homepageUrl: 'https://yoruakio.vercel.app',
        stargazerCount: 5,
        forkCount: 2,
        primaryLanguage: { name: 'JavaScript' },
        topics: ['nextjs', 'portfolio', 'tailwindcss', 'react'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
        languages: [],
      },
    ];

    res.status(200).json({
      projects: fallbackProjects,
      source: 'fallback',
      count: fallbackProjects.length,
      error: error.message,
    });
  }
}