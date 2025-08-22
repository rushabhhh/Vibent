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

/* ----- Helper functions (server-side intended) ----- */
/* Use these from server API routes (supabaseAdmin) to keep logic centralized. */

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