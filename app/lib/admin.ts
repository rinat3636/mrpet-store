import { NextRequest, NextResponse } from 'next/server';

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function checkAdmin(req: NextRequest): boolean {
  const auth = req.headers.get('authorization') || '';
  const token = auth.replace('Bearer ', '').trim();
  return token === process.env.ADMIN_PASSWORD;
}
