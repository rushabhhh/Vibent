// app/api/auth/nonce/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import { createOrUpdateNonce } from '@/lib/supabase';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const address = url.searchParams.get('address');
    if (!address) return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    return await createNonce(address);
  } catch (err) {
    console.error('nonce GET error', err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { address } = await req.json();
    if (!address) return NextResponse.json({ error: 'Wallet address required' }, { status: 400 });
    return await createNonce(address);
  } catch (err) {
    console.error('nonce POST error', err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
}

async function createNonce(address) {
  const nonce = randomBytes(16).toString('hex');
  const message = `Vibent Authentication

Address: ${address}
Chain: BNB Smart Chain (BSC)
Nonce: ${nonce}
Issued At: ${new Date().toISOString()}
Expires In: 5m`;
  const expiresAtIso = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  await createOrUpdateNonce(address.toLowerCase(), nonce, message, expiresAtIso);
  return NextResponse.json({ message });
}