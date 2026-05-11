import * as jose from 'jose';
import crypto from 'crypto';
import { findByField, updateRecord } from './sheets';

const getSecret = (): Uint8Array => {
  const secret = process.env.JWT_SECRET || 'osgu-library-jwt-secret-change-in-production-2025';
  return new TextEncoder().encode(secret);
};

// ─── Password Hashing ─────────────────────────────────
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const verify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === verify;
}

// ─── JWT Tokens ────────────────────────────────────────
export async function generateToken(payload: { username: string; name: string; role: string }): Promise<string> {
  const secret = getSecret();
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);
}

export async function verifyToken(token: string): Promise<{ username: string; name: string; role: string } | null> {
  try {
    const secret = getSecret();
    const { payload } = await jose.jwtVerify(token, secret);
    return {
      username: payload.username as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

// ─── Admin Auth ────────────────────────────────────────
export async function adminLogin(username: string, password: string) {
  const admin = await findByField('admin', 'username', username);
  if (!admin) throw new Error('Invalid credentials');

  const valid = verifyPassword(password, admin.password);
  if (!valid) throw new Error('Invalid credentials');

  const token = await generateToken({
    username: admin.username,
    name: admin.name,
    role: admin.role,
  });

  return { token, name: admin.name, role: admin.role };
}

// Helper to verify admin token from request
export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  return authHeader.slice(7);
}
