export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { verifySessionFromRequest } from '@/lib/jwt';
import { getOrgMembershipByAddress } from '@/lib/supabase';

export async function POST(req) {
  try {
    const session = await verifySessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const address = String(session.sub).toLowerCase();
    const memberships = await getOrgMembershipByAddress(address);
    if (!memberships || memberships.length === 0) {
      return NextResponse.json({ exists: false });
    }
    // return first org (frontend expects single org for access flow)
    const first = memberships[0];
    return NextResponse.json({
      exists: true,
      org: first.organizations ?? {
        id: first.org_id,
        name: first.organizations?.name ?? null,
        domain: first.organizations?.domain ?? null,
      },
      role: first.role,
    });
  } catch (err) {
    console.error('api/org/check error', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}