import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'colourcraft.db');

function getDb(): Database.Database {
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  return db;
}

export function initDb(): void {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS brands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      logo_url TEXT,
      description TEXT,
      website TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand_id INTEGER REFERENCES brands(id),
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      colour_range TEXT,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS consultations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT,
      date_booked DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const count = (db.prepare('SELECT COUNT(*) as c FROM brands').get() as { c: number }).c;
  if (count === 0) {
    seedDb(db);
  }

  db.close();
}

function seedDb(db: Database.Database): void {
  const insertBrand = db.prepare(
    'INSERT INTO brands (name, logo_url, description, website) VALUES (?, ?, ?, ?)'
  );

  const brands = [
    ['MIDAS', '/logos/midas.svg', 'Premium exterior and interior coatings trusted by professionals across Southern Africa.', 'https://www.midas.co.za'],
    ['Dekster', '/logos/dekster.svg', 'Professional-grade decorative paints engineered for flawless, long-lasting finishes.', 'https://www.dekster.co.za'],
    ['Earthcote', '/logos/earthcote.svg', 'Eco-friendly, low-VOC paint solutions that are kind to your home and the planet.', 'https://www.earthcote.co.za'],
    ['Envirolite', '/logos/envirolite.svg', 'Sustainable, environmentally conscious finishes with outstanding coverage and durability.', 'https://www.envirolite.co.za'],
    ['Plascon', '/logos/plascon.svg', "South Africa's most trusted paint brand, delivering quality colour for over 130 years.", 'https://www.plascon.co.za'],
    ['Dulux', '/logos/dulux.svg', 'World-class colour and quality backed by global innovation and South African expertise.', 'https://www.dulux.co.za'],
  ];

  const brandIds: number[] = [];
  for (const b of brands) {
    const result = insertBrand.run(...b);
    brandIds.push(result.lastInsertRowid as number);
  }

  const insertProduct = db.prepare(
    'INSERT INTO products (brand_id, name, type, colour_range, description) VALUES (?, ?, ?, ?, ?)'
  );

  const products = [
    [brandIds[0], 'MIDAS PVA Interior', 'interior', 'Full spectrum', 'High-coverage water-based PVA perfect for walls and ceilings.'],
    [brandIds[0], 'MIDAS Weatherguard', 'exterior', 'Neutral tones', 'Flexible acrylic coating designed to withstand harsh South African weather.'],
    [brandIds[1], 'Dekster Silk', 'interior', '2000+ colours', 'Silky smooth finish with excellent washability for high-traffic areas.'],
    [brandIds[1], 'Dekster Gloss Enamel', 'interior', 'Classic whites', 'Hard-wearing gloss enamel for trim, doors, and feature walls.'],
    [brandIds[2], 'Earthcote Natural Matt', 'interior', 'Earth tones', 'Zero-VOC matt paint with a beautiful natural texture.'],
    [brandIds[2], 'Earthcote Exterior Shield', 'exterior', 'Warm neutrals', 'Breathable, eco-certified exterior paint ideal for plastered walls.'],
    [brandIds[3], 'Envirolite Eggshell', 'interior', 'Pastels & neutrals', 'Low-sheen, low-impact finish made from sustainable raw materials.'],
    [brandIds[3], 'Envirolite Outdoor', 'exterior', 'Nature-inspired', 'UV-stable exterior paint with a minimal environmental footprint.'],
    [brandIds[4], 'Plascon Velvaglo', 'interior', 'Plascon Colours', 'South Africa\'s favourite interior paint with a luxurious velvet sheen.'],
    [brandIds[4], 'Plascon 5-in-1', 'interior', 'Plascon Colours', 'Primer and paint in one — covers, seals, and protects in a single coat.'],
    [brandIds[5], 'Dulux Weathershield', 'exterior', 'Dulux Colour Atlas', 'Advanced exterior protection against rain, UV, and temperature extremes.'],
    [brandIds[5], 'Dulux Wash & Wear', 'interior', 'Dulux Colour Atlas', 'Tough, washable interior paint that stands up to everyday family life.'],
  ];

  for (const p of products) {
    insertProduct.run(...p);
  }
}

export function getAllBrands() {
  const db = getDb();
  const brands = db.prepare('SELECT * FROM brands ORDER BY name').all();
  db.close();
  return brands;
}

export function getAllProducts(brandId?: number, type?: string) {
  const db = getDb();
  let sql = 'SELECT p.*, b.name as brand_name, b.logo_url as brand_logo FROM products p JOIN brands b ON p.brand_id = b.id';
  const params: (number | string)[] = [];
  const conditions: string[] = [];

  if (brandId) {
    conditions.push('p.brand_id = ?');
    params.push(brandId);
  }
  if (type) {
    conditions.push('p.type = ?');
    params.push(type);
  }
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }
  sql += ' ORDER BY b.name, p.name';

  const products = db.prepare(sql).all(...params);
  db.close();
  return products;
}

export function saveConsultation(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const db = getDb();
  const result = db
    .prepare('INSERT INTO consultations (name, email, phone, message) VALUES (?, ?, ?, ?)')
    .run(data.name, data.email, data.phone ?? null, data.message);
  db.close();
  return result.lastInsertRowid;
}
