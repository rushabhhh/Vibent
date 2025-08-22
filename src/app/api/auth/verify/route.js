// app/api/auth/verify/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { verifyMessage as viemVerifyMessage } from 'viem';
import {
  getNonceByAddress,
  deleteNonceByAddress,
  getUserByAddress,
  upsertUserByAddress,
} from '@/lib/supabase';
import { createSessionForPayload } from '@/lib/jwt';

const DEBUG = process.env.DEBUG_AUTH === 'true';

function makeError(msg, status = 400, extra = {}) {
  const body = { error: msg };
  if (DEBUG && Object.keys(extra).length) body.debug = extra;
  return NextResponse.json(body, { status });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return makeError('Invalid JSON', 400);

    const { address, signature } = body;
    if (!address || !signature) return makeError('address and signature required', 400);

    const addr = String(address).toLowerCase();
    const nonceRow = await getNonceByAddress(addr);
    if (!nonceRow) return makeError('Nonce not found. Request a new nonce.', 400);

    if (new Date(nonceRow.expires_at) < new Date()) {
      return makeError('Nonce expired. Request a new nonce.', 400);
    }

    const message = String(nonceRow.message);

    // viem-based verification (works across wallets)
    const isValid = await viemVerifyMessage({
      address: addr,
      message,
      signature,
    });

    if (!isValid) {
      return makeError('Invalid signature', 401, DEBUG ? { message, signature } : undefined);
    }

    // consume nonce
    await deleteNonceByAddress(addr);

    // upsert user
    let user = await getUserByAddress(addr);
    let isNew = false;
    if (!user) {
      user = await upsertUserByAddress(addr, { address: addr });
      isNew = true;
    }

    // create session
    const { token, cookie } = await createSessionForPayload(
      { sub: addr, uid: user.id, role: 'user' },
      { expiresIn: '7d' },
      { maxAge: 60 * 60 * 24 * 7 } // 7 days
    );

    const res = NextResponse.json({ user, isNew, debug: DEBUG ? { isValid } : undefined });
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (err) {
    console.error('auth/verify error', err);
    return makeError('Server error', 500, DEBUG ? { stack: String(err.stack) } : undefined);
  }
}