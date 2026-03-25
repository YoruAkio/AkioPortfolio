import { NextResponse } from 'next/server';
import { getCodingStats } from '@/lib/wakatime';

export async function GET() {
  try {
    const data = await getCodingStats();

    return NextResponse.json(data, {
      headers: {
        'cache-control': 'public, s-maxage=3600, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('[WakaTime API] Failed to fetch coding stats:', error);

    return NextResponse.json(
      {
        totals: {
          totalTime: 'Unavailable',
          totalTimeSeconds: 0,
          totalLanguageTime: 'Unavailable',
          totalLanguageTimeSeconds: 0,
        },
        last7Days: {
          range: 'Last 7 Days',
          isUpToDate: false,
          languages: [],
          operatingSystems: [],
        },
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
