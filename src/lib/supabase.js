import { createClient } from '@supabase/supabase-js';

/**
 * Environment variables required:
 * - SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 * - SUPABASE_SERVICE_ROLE_KEY (server only, keep secret)
 *
 * This file exports:
 * - supabase: client-safe (anon) instance for browser usage
 * - supabaseAdmin: service-role instance for server usage (use carefully)
 * - small helpers for common DB interactions used by the auth endpoints
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL environment variable');
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  // only throw for server contexts that require admin access — keep this check to fail early on server builds
  // If you need a client-only build, ensure SERVICE_ROLE key is provided in server env and not bundled to client.
  // For safety, still create the anon client below.
  console.warn('SUPABASE_SERVICE_ROLE_KEY is not set — admin operations will fail.');
}

if (!SUPABASE_ANON_KEY) {
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set — client operations may fail.');
}

// Public (browser) supabase client — safe to use in client-side code
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY ?? '', {
  auth: { persistSession: false },
});

// Server/admin supabase client — use in API routes / server code only
export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY ?? '', {
  auth: { persistSession: false },
});

/* helper to ensure admin client available and fail early with helpful message */
function ensureAdminAvailable() {
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    const msg = 'Server missing SUPABASE_SERVICE_ROLE_KEY – admin operations are disabled. Set SUPABASE_SERVICE_ROLE_KEY in your server environment.';
    console.error(msg);
    throw new Error(msg);
  }
}

/**
 * Use the actual table name in your DB. Error log indicates your DB uses "orgs"
 * so we reference "orgs" and "org_members" here.
 */
const ORG_TABLE = process.env.ORG_TABLE_NAME ?? 'orgs';
const ORG_MEMBER_TABLE = process.env.ORG_MEMBER_TABLE_NAME ?? 'org_members';

export async function getUserByAddress(address) {
  if (!address) return null;
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .ilike('address', address)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function upsertUserByAddress(address, payload = {}) {
  if (!address) throw new Error('address required');
  const row = { address: address.toLowerCase(), ...payload };
  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert(row, { onConflict: 'address' })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function createOrUpdateNonce(address, nonce, message, expiresAtIso) {
  if (!address || !nonce || !message) throw new Error('address, nonce and message required');
  const row = {
    address: address.toLowerCase(),
    nonce,
    message,
    expires_at: expiresAtIso,
  };
  const { data, error } = await supabaseAdmin
    .from('auth_nonces')
    .upsert(row, { onConflict: 'address' })
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function getNonceByAddress(address) {
  if (!address) return null;
  const { data, error } = await supabaseAdmin
    .from('auth_nonces')
    .select('*')
    .eq('address', address.toLowerCase())
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function deleteNonceByAddress(address) {
  if (!address) return null;
  const { data, error } = await supabaseAdmin
    .from('auth_nonces')
    .delete()
    .eq('address', address.toLowerCase());
  if (error) throw error;
  return data;
}

export async function updateUserProfileByAddress(address, updatePayload = {}) {
  if (!address) throw new Error('address required');
  const allowed = [
    'name',
    'username',
    'profile_picker',
    'bio',
    'dob',
    'binance_id',
    'social_links',
    'interests',
  ];
  const update = {};
  for (const k of allowed) {
    if (k in updatePayload) update[k] = updatePayload[k];
  }
  if (Object.keys(update).length === 0) {
    throw new Error('no allowed profile fields provided');
  }
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(update)
    .eq('address', address.toLowerCase())
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

// New helpers for organization logic
export async function getOrgMembershipByAddress(address) {
  if (!address) return [];
  ensureAdminAvailable();
  try {
    const { data, error } = await supabaseAdmin
      .from(ORG_MEMBER_TABLE)
      .select(`id, org_id, role, created_at, ${ORG_TABLE}(id, name, domain, description)`)
      .ilike('address', address.toLowerCase());
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('getOrgMembershipByAddress error', err);
    throw err;
  }
}

export async function createOrganizationWithOwner(address, orgPayload = {}) {
  ensureAdminAvailable();
  if (!address) throw new Error('address required');
  if (!orgPayload.name || !orgPayload.domain) throw new Error('name and domain required');

  try {
    // prevent duplicate domain (case-insensitive)
    const { data: exists, error: checkErr } = await supabaseAdmin
      .from(ORG_TABLE)
      .select('id')
      .ilike('domain', orgPayload.domain)
      .maybeSingle();
    if (checkErr) throw checkErr;
    if (exists) {
      const e = new Error('Organization domain already registered');
      e.code = 'DUP_DOMAIN';
      throw e;
    }

    // insert organization
    const { data: orgData, error: orgErr } = await supabaseAdmin
      .from(ORG_TABLE)
      .insert({
        name: orgPayload.name,
        domain: orgPayload.domain,
        description: orgPayload.description ?? null,
      })
      .select('*')
      .single();
    if (orgErr) throw orgErr;

    // insert owner membership
    const { data: memberData, error: memErr } = await supabaseAdmin
      .from(ORG_MEMBER_TABLE)
      .insert({
        org_id: orgData.id,
        address: address.toLowerCase(),
        role: 'owner',
      })
      .select('*')
      .single();
    if (memErr) throw memErr;

    return { organization: orgData, member: memberData };
  } catch (err) {
    // map common Postgres errors to clearer names for callers
    if (err?.code === '23505') { // unique_violation
      const e = new Error('Unique constraint violated');
      e.code = 'PG_DUP';
      throw e;
    }
    if (err?.code === '23503') { // foreign_key_violation
      const e = new Error('Foreign key violation (possible table mismatch)');
      e.code = 'PG_FK';
      // include original details for server logs
      console.error('createOrganizationWithOwner foreign key error', err);
      throw e;
    }
    console.error('createOrganizationWithOwner error', err);
    throw err;
  }
}