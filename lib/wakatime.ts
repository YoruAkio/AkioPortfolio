interface WakaTimeRangeSummary {
  total_seconds: number;
  text: string;
  digital: string;
  hours?: number;
  minutes?: number;
  percent?: number;
  name: string;
}

interface WakaTimeAllTimeResponse {
  data: {
    text: string;
    total_seconds: number;
    digital: string;
  };
}

interface WakaTimeStatsResponse {
  data: {
    human_readable_total: string;
    human_readable_total_including_other_language: string;
    total_seconds: number;
    total_seconds_including_other_language: number;
    languages: WakaTimeRangeSummary[];
    operating_systems: WakaTimeRangeSummary[];
    is_up_to_date: boolean;
    human_readable_range: string;
  };
}

export interface CodingStatsData {
  totals: {
    totalTime: string;
    totalTimeSeconds: number;
    totalLanguageTime: string;
    totalLanguageTimeSeconds: number;
  };
  last7Days: {
    range: string;
    isUpToDate: boolean;
    languages: WakaTimeRangeSummary[];
    operatingSystems: WakaTimeRangeSummary[];
  };
}

const WAKATIME_API_BASE_URL = 'https://wakatime.com/api/v1/users/current';

function getAuthHeader() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    throw new Error('WAKATIME_API_KEY is not configured');
  }

  return `Basic ${Buffer.from(apiKey).toString('base64')}`;
}

async function fetchWakaTime<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${WAKATIME_API_BASE_URL}${endpoint}`, {
    headers: {
      Authorization: getAuthHeader(),
      Accept: 'application/json',
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`WakaTime request failed: ${response.status}`);
  }

  return response.json();
}

function sortStats(items: WakaTimeRangeSummary[], limit: number) {
  return [...items]
    .sort((a, b) => b.total_seconds - a.total_seconds)
    .slice(0, limit);
}

// @note normalize wakatime responses into the ui-specific shape
export async function getCodingStats(): Promise<CodingStatsData> {
  const [allTime, allTimeStats, last7DaysStats] = await Promise.all([
    fetchWakaTime<WakaTimeAllTimeResponse>('/all_time_since_today'),
    fetchWakaTime<WakaTimeStatsResponse>('/stats/all_time'),
    fetchWakaTime<WakaTimeStatsResponse>('/stats/last_7_days'),
  ]);

  return {
    totals: {
      totalTime: allTime.data.text,
      totalTimeSeconds: allTime.data.total_seconds,
      totalLanguageTime: allTimeStats.data.human_readable_total,
      totalLanguageTimeSeconds: allTimeStats.data.total_seconds,
    },
    last7Days: {
      range: last7DaysStats.data.human_readable_range,
      isUpToDate: last7DaysStats.data.is_up_to_date,
      languages: sortStats(last7DaysStats.data.languages, 6),
      operatingSystems: sortStats(last7DaysStats.data.operating_systems, 4),
    },
  };
}
