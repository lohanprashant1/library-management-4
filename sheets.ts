import { google } from 'googleapis';
import crypto from 'crypto';

// ─── Auth ──────────────────────────────────────────────
function getAuth() {
  const raw = process.env.GOOGLE_CREDENTIALS;
  if (!raw) throw new Error('GOOGLE_CREDENTIALS env var not set');
  const credentials = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  return auth;
}

function getSheets() {
  return google.sheets({ version: 'v4', auth: getAuth() });
}

function getSpreadsheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) throw new Error('GOOGLE_SHEET_ID env var not set');
  return id;
}

// ─── Helpers ───────────────────────────────────────────
function generateId(): string {
  return crypto.randomBytes(12).toString('hex');
}

function now(): string {
  return new Date().toISOString();
}

function parseBoolean(val: string | undefined): boolean {
  if (!val) return false;
  return val === 'true' || val === '1' || val === 'TRUE';
}

function parseNumber(val: string | undefined): number {
  if (!val) return 0;
  const n = parseInt(val, 10);
  return isNaN(n) ? 0 : n;
}

// ─── Sheet Definitions ────────────────────────────────
const SHEET_HEADERS: Record<string, string[]> = {
  admin: ['id', 'username', 'password', 'name', 'role'],
  books: ['id', 'title', 'author', 'genre', 'year', 'isbn', 'available', 'copies', 'featured', 'active'],
  events: ['id', 'title', 'description', 'date', 'time', 'location', 'category', 'registration', 'capacity', 'registered', 'active'],
  news: ['id', 'title', 'excerpt', 'content', 'category', 'date', 'active'],
  services: ['id', 'name', 'description', 'icon', 'color', 'active', 'order'],
  faqs: ['id', 'question', 'answer', 'category', 'active', 'order'],
  staff: ['id', 'name', 'role', 'email', 'phone', 'active'],
  rooms: ['id', 'name', 'type', 'capacity', 'features', 'available'],
  plans: ['id', 'name', 'price', 'duration', 'benefits', 'active', 'featured'],
  resources: ['id', 'name', 'description', 'category', 'url', 'icon', 'active'],
  content: ['id', 'section', 'content', 'updatedAt'],
};

// ─── Generic Read ──────────────────────────────────────
export async function getAll(sheetName: string): Promise<Record<string, any>[]> {
  const sheets = getSheets();
  const headers = SHEET_HEADERS[sheetName];
  if (!headers) throw new Error(`Unknown sheet: ${sheetName}`);

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: getSpreadsheetId(),
      range: `${sheetName}!A:Z`,
    });
    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    return rows.slice(1)
      .filter(row => row.length > 0 && row[0])
      .map(row => {
        const obj: Record<string, any> = {};
        headers.forEach((header, i) => {
          const val = row[i] || '';
          // Parse types based on field name
          if (['available', 'featured', 'active', 'registration'].includes(header)) {
            obj[header] = parseBoolean(val);
          } else if (['year', 'copies', 'capacity', 'registered', 'order'].includes(header)) {
            obj[header] = parseNumber(val);
          } else {
            obj[header] = val;
          }
        });
        return obj;
      });
  } catch (error: any) {
    if (error.message?.includes('Unable to parse range') || error.code === 404) {
      // Sheet doesn't exist yet, return empty
      return [];
    }
    throw error;
  }
}

// ─── Generic Write ─────────────────────────────────────
export async function writeAll(sheetName: string, data: Record<string, any>[]): Promise<void> {
  const sheets = getSheets();
  const headers = SHEET_HEADERS[sheetName];
  if (!headers) throw new Error(`Unknown sheet: ${sheetName}`);

  const rows = [headers, ...data.map(item =>
    headers.map(h => {
      const val = item[h];
      if (val === undefined || val === null) return '';
      if (typeof val === 'boolean') return val ? 'true' : 'false';
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
    })
  )];

  await sheets.spreadsheets.values.update({
    spreadsheetId: getSpreadsheetId(),
    range: `${sheetName}!A1`,
    valueInputOption: 'RAW',
    requestBody: { values: rows },
  });
}

// ─── Create (Append) ──────────────────────────────────
export async function createRecord(sheetName: string, data: Record<string, any>): Promise<Record<string, any>> {
  const all = await getAll(sheetName);
  const record = {
    id: generateId(),
    createdAt: now(),
    updatedAt: now(),
    ...data,
  };
  all.push(record);
  await writeAll(sheetName, all);
  return record;
}

// ─── Update ────────────────────────────────────────────
export async function updateRecord(sheetName: string, id: string, data: Record<string, any>): Promise<Record<string, any>> {
  const all = await getAll(sheetName);
  const index = all.findIndex(r => r.id === id);
  if (index === -1) throw new Error('Record not found');
  all[index] = { ...all[index], ...data, updatedAt: now() };
  await writeAll(sheetName, all);
  return all[index];
}

// ─── Delete ────────────────────────────────────────────
export async function deleteRecord(sheetName: string, id: string): Promise<void> {
  const all = await getAll(sheetName);
  const filtered = all.filter(r => r.id !== id);
  if (filtered.length === all.length) throw new Error('Record not found');
  await writeAll(sheetName, filtered);
}

// ─── Find One ──────────────────────────────────────────
export async function findById(sheetName: string, id: string): Promise<Record<string, any> | null> {
  const all = await getAll(sheetName);
  return all.find(r => r.id === id) || null;
}

// ─── Find By Field ─────────────────────────────────────
export async function findByField(sheetName: string, field: string, value: any): Promise<Record<string, any> | null> {
  const all = await getAll(sheetName);
  return all.find(r => String(r[field]).toLowerCase() === String(value).toLowerCase()) || null;
}

// ─── Ensure Sheet Exists ───────────────────────────────
export async function ensureSheet(sheetName: string): Promise<void> {
  const sheets = getSheets();
  const headers = SHEET_HEADERS[sheetName];
  if (!headers) return;

  try {
    // Try to read the sheet
    await sheets.spreadsheets.values.get({
      spreadsheetId: getSpreadsheetId(),
      range: `${sheetName}!A1:Z1`,
    });
  } catch {
    // Sheet doesn't exist, create it with headers
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: getSpreadsheetId(),
        requestBody: {
          requests: [{
            addSheet: {
              properties: { title: sheetName }
            }
          }]
        }
      });
    } catch {
      // Sheet might already exist but be empty
    }
    // Write headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: getSpreadsheetId(),
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      requestBody: { values: [headers] },
    });
  }
}

// ─── Content Helpers ──────────────────────────────────
export async function getContent(section: string): Promise<any> {
  const all = await getAll('content');
  const item = all.find(c => c.section === section);
  if (!item) return null;
  try {
    return JSON.parse(item.content);
  } catch {
    return item.content;
  }
}

export async function getAllContent(): Promise<Record<string, any>[]> {
  const all = await getAll('content');
  return all.map(c => ({
    section: c.section,
    content: (() => { try { return JSON.parse(c.content); } catch { return c.content; } })(),
  }));
}

export async function upsertContent(section: string, content: any): Promise<Record<string, any>> {
  const all = await getAll('content');
  const index = all.findIndex(c => c.section === section);
  const contentStr = typeof content === 'string' ? content : JSON.stringify(content);

  if (index >= 0) {
    all[index].content = contentStr;
    all[index].updatedAt = now();
  } else {
    all.push({ id: generateId(), section, content: contentStr, updatedAt: now() });
  }
  await writeAll('content', all);
  return all[index >= 0 ? index : all.length - 1] as any;
}

export { generateId, now };
