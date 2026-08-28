import { NextRequest, NextResponse } from 'next/server';
import { initDb, getAllProducts } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const brandId = searchParams.get('brand') ? parseInt(searchParams.get('brand')!, 10) : undefined;
    const type = searchParams.get('type') ?? undefined;

    initDb();
    const products = getAllProducts(brandId, type);

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: 'Failed to load products.' }, { status: 500 });
  }
}
