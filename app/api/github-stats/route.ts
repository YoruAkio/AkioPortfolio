import { NextResponse } from "next/server";

// @note contribution day interface
interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

// @note language stat interface
interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

// @note simple in-memory cache
let cache: {
  data: {
    contributions: ContributionDay[];
    languages: LanguageStat[];
  } | null;
  timestamp: number | null;
  ttl: number;
} = {
  data: null,
  timestamp: null,
  ttl: 60 * 60 * 1000, // 1 hour
};

// @note graphql query for contributions and languages
const STATS_QUERY = `
  query GetUserStats($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
      repositories(first: 100, ownerAffiliations: [OWNER], orderBy: {field: STARGAZERS, direction: DESC}) {
        nodes {
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

// @note contribution level for heatmap color (0-4)
const getContributionLevel = (count: number): number => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 4) return 2;
  if (count <= 6) return 3;
  return 4;
};

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

  if (!process.env.GITHUB_TOKEN) {
    console.log("[GitHub Stats] GITHUB_TOKEN not configured");
    return NextResponse.json({
      contributions: [],
      languages: [],
      error: "GITHUB_TOKEN not configured",
    });
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: STATS_QUERY,
        variables: { username: "YoruAkio" },
      }),
    });

    if (!response.ok) {
      console.error("[GitHub Stats] GraphQL request failed:", response.status, response.statusText);
      throw new Error(`GraphQL failed: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("[GitHub Stats] GraphQL errors:", data.errors);
      throw new Error(data.errors[0].message);
    }

    const user = data.data?.user;

    if (!user) {
      throw new Error("User not found");
    }

    // @note process contributions (last 52 weeks = 1 year)
    const contributions: ContributionDay[] = [];
    const weeks = user.contributionsCollection?.contributionCalendar?.weeks || [];

    weeks.slice(-52).forEach((week: { contributionDays: { date: string; contributionCount: number }[] }) => {
      week.contributionDays.forEach((day: { date: string; contributionCount: number }) => {
        contributions.push({
          date: day.date,
          count: day.contributionCount,
          level: getContributionLevel(day.contributionCount),
        });
      });
    });

    // @note process languages from repositories (more accurate than user.languages)
    const languageMap = new Map<string, { count: number; color: string }>();

    const repos = user.repositories?.nodes || [];

    repos.forEach((repo: { primaryLanguage: { name: string; color: string } | null }) => {
      if (repo.primaryLanguage?.name) {
        const lang = repo.primaryLanguage.name;
        const color = repo.primaryLanguage.color || "#58a6ff";
        languageMap.set(lang, {
          count: (languageMap.get(lang)?.count || 0) + 1,
          color,
        });
      }
    });

    // @note calculate total and percentages
    let total = 0;
    languageMap.forEach((v) => (total += v.count));

    const languages: LanguageStat[] = [];
    languageMap.forEach((v, name) => {
      languages.push({
        name,
        count: v.count,
        percentage: Math.round((v.count / total) * 100),
        color: v.color,
      });
    });

    // @note sort by percentage, take top 10
    languages.sort((a, b) => b.count - a.count).slice(0, 10);

    const responseData = {
      contributions,
      languages,
    };

    // @note cache response
    cache.data = responseData;
    cache.timestamp = Date.now();

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("[GitHub Stats API error:", error);

    return NextResponse.json({
      contributions: [],
      languages: [],
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
