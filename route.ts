import { NextResponse } from 'next/server';
import { getAll } from '@/lib/sheets';

export async function GET() {
  try {
    const items = await getAll('rooms');
    return NextResponse.json({ rooms: items, total: items.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
