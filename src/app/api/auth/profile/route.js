// app/api/auth/profile/route.js
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { verifySessionFromRequest } from '@/lib/jwt';
import { updateUserProfileByAddress } from '@/lib/supabase';

export async function POST(req) {
  try {
    const session = await verifySessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

    const update = {
      name: body.name ?? null,
      username: body.username ?? null,
      profile_picker: body.profile_picker ?? null,
      bio: body.bio ?? null,
      dob: body.dob ?? null,
      binance_id: body.binance_id ?? null,
      social_links: body.social_links ?? null, // array or null
      interests: body.interests ?? null,       // array or null
    };

    const updated = await updateUserProfileByAddress(session.sub, update);
    return NextResponse.json({ user: updated });
  } catch (err) {
    console.error('auth/profile error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}