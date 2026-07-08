import { NextResponse } from 'next/server';

export async function GET() {
  const content = "google-site-verification: googlee7f28005743b395c.html";
  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}