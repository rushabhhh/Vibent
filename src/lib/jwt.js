/**
 * Versatile JWT helper for server-side usage (Next.js API routes / server components).
 *
 * Exports:
 * - signToken(payload, opts)          -> signed JWT string
 * - verifyToken(token, opts)         -> verified payload (throws on invalid)
 * - decodeToken(token, opts)         -> decoded payload (no verification)
 * - getTokenFromCookie(cookieHeader) -> token string or null
 * - getTokenFromRequest(req)         -> token from Request (cookie or Authorization) or null
 * - createSessionCookie(token, opts) -> Set-Cookie header value for session cookie
 * - clearSessionCookie()             -> Set-Cookie header value to clear cookie
 *
 * Env required:
 * - AUTH_JWT_SECRET
 *
 * Notes:
 * - All functions are synchronous except those that explicitly use async patterns.
 * - This file is intended for server-side only (keeps secret out of client bundles).
 */

import jwt from 'jsonwebtoken';

const SECRET = process.env.AUTH_JWT_SECRET;
if (!SECRET) {
  throw new Error('Missing AUTH_JWT_SECRET environment variable');
}

const DEFAULT_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || 'vibent_session';
const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

/**
 * Sign a payload into a JWT.
 * @param {Object} payload
 * @param {Object} [opts] - jwt.sign options: { expiresIn, algorithm, issuer, audience }
 * @returns {string}
 */
export function signToken(payload, opts = {}) {
  const signOpts = {
    expiresIn: opts.expiresIn || '7d',
    algorithm: opts.algorithm || 'HS256',
  };
  // only add issuer/audience when provided and valid (avoid jwt lib type checks)
  if (opts.issuer !== undefined && opts.issuer !== null) {
    if (typeof opts.issuer === 'string') signOpts.issuer = opts.issuer;
    else throw new TypeError('"issuer" must be a string when provided');
  }
  if (opts.audience !== undefined && opts.audience !== null) {
    if (typeof opts.audience === 'string') signOpts.audience = opts.audience;
    else throw new TypeError('"audience" must be a string when provided');
  }
  return jwt.sign(payload, SECRET, signOpts);
}

/**
 * Verify a JWT and return the decoded payload.
 * Throws on invalid/expired token.
 * @param {string} token
 * @param {Object} [opts] - jwt.verify options: { ignoreExpiration, audience, issuer }
 * @returns {Object}
 */
export function verifyToken(token, opts = {}) {
  return jwt.verify(token, SECRET, {
    ignoreExpiration: opts.ignoreExpiration || false,
    audience: opts.audience,
    issuer: opts.issuer,
  });
}

/**
 * Decode a token without verifying signature (useful for non-secure inspection).
 * @param {string} token
 * @param {Object} [opts] - jwt.decode options
 * @returns {null|Object}
 */
export function decodeToken(token, opts = {}) {
  return jwt.decode(token, opts);
}

/**
 * Parse a cookie header and return the value for cookieName.
 * @param {string|null|undefined} cookieHeader
 * @param {string} [cookieName]
 * @returns {string|null}
 */
export function getTokenFromCookie(cookieHeader, cookieName = DEFAULT_COOKIE_NAME) {
  if (!cookieHeader) return null;
  const pairs = cookieHeader.split(';').map((c) => c.trim());
  for (const p of pairs) {
    const [k, ...rest] = p.split('=');
    if (k === cookieName) return rest.join('=');
  }
  return null;
}

/**
 * Extract token from a Next.js Request or Node request-like object.
 * Tries Cookie first, then Authorization: Bearer.
 * @param {Request|{ headers?: Headers|Object }} req
 * @param {string} [cookieName]
 * @returns {string|null}
 */
export function getTokenFromRequest(req, cookieName = DEFAULT_COOKIE_NAME) {
  if (!req) return null;
  // Request (Web) object
  const headers = req.headers ?? req?.headers;
  if (headers) {
    // cookie
    const cookieHeader = typeof headers.get === 'function' ? headers.get('cookie') : headers.cookie || headers.Cookie;
    const tokenFromCookie = getTokenFromCookie(cookieHeader, cookieName);
    if (tokenFromCookie) return tokenFromCookie;

    // Authorization header
    const auth = typeof headers.get === 'function' ? headers.get('authorization') : headers.authorization || headers.Authorization;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      return auth.slice(7).trim();
    }
  }
  // fallback: maybe req.cookies (Next.js edge)
  if (req.cookies) {
    const val = req.cookies[cookieName] ?? (typeof req.cookies.get === 'function' ? req.cookies.get(cookieName) : undefined);
    if (val) return typeof val === 'object' && val.value ? val.value : val;
  }
  return null;
}

/**
 * Build a Set-Cookie header string for the session token.
 * Use this header value in API responses.
 * @param {string} token
 * @param {Object} [opts] - options: { name, maxAge, path, domain, httpOnly, secure, sameSite, expires }
 * @returns {string}
 */
export function createSessionCookie(token, opts = {}) {
  const name = opts.name || DEFAULT_COOKIE_NAME;
  const maxAge = opts.maxAge ?? DEFAULT_MAX_AGE;
  const path = opts.path || '/';
  const domain = opts.domain ? `; Domain=${opts.domain}` : '';
  const httpOnly = opts.httpOnly === false ? '' : '; HttpOnly';
  const secure = opts.secure === false ? '' : '; Secure';
  const sameSite = `; SameSite=${opts.sameSite || 'Lax'}`;
  const expires = opts.expires ? `; Expires=${new Date(opts.expires).toUTCString()}` : `; Max-Age=${maxAge}`;
  // Note: cookie value should be url-safe, jwt is fine
  return `${name}=${token}; Path=${path}${domain}${expires}${httpOnly}${secure}${sameSite}`;
}

/**
 * Build a Set-Cookie header to clear the session cookie immediately.
 * @param {Object} [opts] - { name, path, domain, sameSite }
 * @returns {string}
 */
export function clearSessionCookie(opts = {}) {
  const name = opts.name || DEFAULT_COOKIE_NAME;
  const path = opts.path || '/';
  const domain = opts.domain ? `; Domain=${opts.domain}` : '';
  const sameSite = `; SameSite=${opts.sameSite || 'Lax'}`;
  return `${name}=; Path=${path}${domain}; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure${sameSite}`;
}

/**
 * Convenience: sign payload and return Set-Cookie header for the signed token.
 * @param {Object} payload
 * @param {Object} [signOpts] - passed to signToken (expiresIn etc)
 * @param {Object} [cookieOpts] - passed to createSessionCookie (maxAge, name, secure, etc)
 * @returns {{ token: string, cookie: string }}
 */
export function createSessionForPayload(payload, signOpts = {}, cookieOpts = {}) {
  const token = signToken(payload, signOpts);
  const cookie = createSessionCookie(token, cookieOpts);
  return { token, cookie };
}

/**
 * Verify a token from a request and return the payload or null.
 * Does not throw; returns { valid: boolean, payload, error }.
 * @param {Request|Object} req
 * @param {Object} [verifyOpts]
 * @returns {{ valid: boolean, payload: Object|null, error: any|null }}
 */
export function verifyRequestToken(req, verifyOpts = {}) {
  const token = getTokenFromRequest(req, verifyOpts.cookieName);
  if (!token) return { valid: false, payload: null, error: 'no token' };
  try {
    const payload = verifyToken(token, verifyOpts);
    return { valid: true, payload, error: null };
  } catch (err) {
    return { valid: false, payload: null, error: err };
  }
}

/**
 * New: convenience compatible with existing routes
 * returns decoded payload (session) or null when not valid/absent
 * @param {Request|Object} req
 * @param {Object} [verifyOpts]
 * @returns {Object|null}
 */
export async function verifySessionFromRequest(req, verifyOpts = {}) {
  const token = getTokenFromRequest(req, verifyOpts.cookieName);
  if (!token) return null;
  try {
    // verifyToken throws on invalid/expired -> catch and return null
    const payload = verifyToken(token, verifyOpts);
    return payload;
  } catch (err) {
    return null;
  }
}