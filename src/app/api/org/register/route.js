export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { verifySessionFromRequest } from '@/lib/jwt';
import { createOrganizationWithOwner } from '@/lib/supabase';

export async function POST(req) {
  try {
    const session = await verifySessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized — sign in first' }, { status: 401 });
    }
    const body = await req.json().catch(() => null);
    if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

    const address = String(session.sub).toLowerCase();
    const { name, domain, description } = body;
    if (!name || !domain) return NextResponse.json({ error: 'name and domain required' }, { status: 400 });

    // create org, handle duplicate domain explicitly
    try {
      const result = await createOrganizationWithOwner(address, { name, domain, description });
      return NextResponse.json({ ok: true, org: result.organization, member: result.member });
    } catch (err) {
      if (err && err.code === 'DUP_DOMAIN') {
        return NextResponse.json({ error: 'domain already taken' }, { status: 409 });
      }
      throw err;
    }
  } catch (err) {
    console.error('api/org/register error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}