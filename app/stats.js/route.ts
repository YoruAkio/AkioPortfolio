import { NextResponse } from 'next/server';

const UMAMI_SCRIPT_URL = 'https://cloud.umami.is/script.js';

export async function GET() {
  try {
    const response = await fetch(UMAMI_SCRIPT_URL, {
      next: { revalidate: 86400 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Umami script: ${response.status}`);
    }

    const script = await response.text();

    return new NextResponse(script, {
      headers: {
        'content-type': 'application/javascript; charset=utf-8',
        'cache-control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('[Umami Script Proxy] Failed to load script:', error);

    return new NextResponse('// failed to load umami tracker', {
      status: 502,
      headers: {
        'content-type': 'application/javascript; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  }
}
