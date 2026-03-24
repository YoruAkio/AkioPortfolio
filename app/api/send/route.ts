import { NextRequest, NextResponse } from 'next/server';

const UMAMI_COLLECT_URL = 'https://cloud.umami.is/api/send';

function getForwardHeaders(request: NextRequest, contentType: string) {
  const headers = new Headers({
    'content-type': contentType,
  });

  const acceptLanguage = request.headers.get('accept-language');
  const userAgent = request.headers.get('user-agent');
  const xForwardedFor = request.headers.get('x-forwarded-for');
  const xRealIp = request.headers.get('x-real-ip');

  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage);
  }

  if (userAgent) {
    headers.set('user-agent', userAgent);
  }

  if (xForwardedFor) {
    headers.set('x-forwarded-for', xForwardedFor);
  }

  if (xRealIp) {
    headers.set('x-real-ip', xRealIp);
  }

  return headers;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const contentType = request.headers.get('content-type') ?? 'application/json';

    const response = await fetch(UMAMI_COLLECT_URL, {
      method: 'POST',
      headers: getForwardHeaders(request, contentType),
      body,
      cache: 'no-store',
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        'content-type': response.headers.get('content-type') ?? 'application/json; charset=utf-8',
        'cache-control': 'no-store',
      },
    });
  } catch (error) {
    console.error('[Umami Collect Proxy] Failed to forward event:', error);

    return NextResponse.json(
      { error: 'Failed to forward analytics event' },
      { status: 502 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      allow: 'POST, OPTIONS',
    },
  });
}
