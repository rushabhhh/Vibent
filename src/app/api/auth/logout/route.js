import { NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/jwt';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', clearSessionCookie());
  return res;
}