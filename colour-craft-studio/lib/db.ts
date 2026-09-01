import type { Brand } from './brands';
import type { Product } from './products';

export type { Brand, Product };

const mockBrands: Brand[] = [
  { id: 1, name: 'MIDAS', description: 'Premium interior and exterior coatings.', website: 'https://midas.co.za', logo_url: '/logos/midas.png' },
  { id: 2, name: 'Plascon', description: "South Africa's trusted paint leader.", website: 'https://plascon.co.za', logo_url: '/logos/plascon.png' },
  { id: 3, name: 'Dulux', description: 'World-class colour and durable finishes.', website: 'https://dulux.co.za', logo_url: '/logos/dulux.png' },
  { id: 4, name: 'Dekster', description: 'Professional-grade decorative coatings.', website: 'https://dekster.co.za', logo_url: '/logos/dekster.png' },
  { id: 5, name: 'Earthcote', description: 'Natural, low-VOC paint solutions.', website: 'https://earthcote.co.za', logo_url: '/logos/earthcote.png' },
  { id: 6, name: 'Envirolite', description: 'Sustainable, energy-conscious finishes.', website: 'https://envirolite.co.za', logo_url: '/logos/envirolite.png' },
];

const mockProducts: Product[] = [
  { id: 1, brand_id: 1, name: 'MIDAS Interior Matt', type: 'interior', colour_range: 'Whites and neutrals', description: 'Washable low-sheen wall paint for everyday living spaces.' },
  { id: 2, brand_id: 1, name: 'MIDAS Exterior Shield', type: 'exterior', colour_range: 'Contemporary exteriors', description: 'Weather-resistant protection for coastal homes.' },
  { id: 3, brand_id: 2, name: 'Plascon Double Velvet', type: 'interior', colour_range: 'Signature colour collection', description: 'Luxurious matt finish with excellent washability.' },
  { id: 4, brand_id: 2, name: 'Plascon Velvaglo', type: 'specialist', colour_range: 'Classic and bold accents', description: 'Hard-wearing enamel for trim, doors and cabinetry.' },
  { id: 5, brand_id: 3, name: 'Dulux Weathershield', type: 'exterior', colour_range: 'Exterior colour palette', description: 'Flexible, long-lasting protection against sun and rain.' },
  { id: 6, brand_id: 3, name: 'Dulux Easycare', type: 'interior', colour_range: 'Family-friendly colours', description: 'Stain-resistant paint for busy rooms and hallways.' },
  { id: 7, brand_id: 4, name: 'Dekster Pro Matt', type: 'interior', colour_range: 'Decorator whites', description: 'Professional matt finish with dependable coverage.' },
  { id: 8, brand_id: 4, name: 'Dekster Roof Coat', type: 'specialist', colour_range: 'Roof and metal shades', description: 'Protective coating for roofs and exterior metalwork.' },
  { id: 9, brand_id: 5, name: 'Earthcote Natural', type: 'eco', colour_range: 'Earth-inspired tones', description: 'Breathable low-VOC finish for healthier interiors.' },
  { id: 10, brand_id: 5, name: 'Earthcote Limewash', type: 'eco', colour_range: 'Soft mineral washes', description: 'Textured mineral finish with a hand-crafted character.' },
  { id: 11, brand_id: 6, name: 'Envirolite Cool Roof', type: 'eco', colour_range: 'Reflective roof colours', description: 'Energy-conscious roof coating designed to reduce heat gain.' },
  { id: 12, brand_id: 6, name: 'Envirolite Eco Interior', type: 'eco', colour_range: 'Low-VOC colour range', description: 'Low-odour finish for comfortable indoor spaces.' },
];

interface Consultation {
  id: number;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date_booked: string;
}

const consultations: Consultation[] = [];

export function initDb(): void {}

export function getAllBrands(): Brand[] {
  return [...mockBrands];
}

export function getProductsByBrand(brandId: number): Product[] {
  return mockProducts.filter((product) => product.brand_id === brandId);
}

export function getAllProducts(brandId?: number, type?: string): Product[] {
  return mockProducts.filter(
    (product) =>
      (brandId === undefined || product.brand_id === brandId) &&
      (type === undefined || product.type === type),
  );
}

export function saveConsultation(
  consultation: Omit<Consultation, 'id' | 'date_booked'>,
): number {
  const entry: Consultation = {
    ...consultation,
    id: consultations.length + 1,
    date_booked: new Date().toISOString(),
  };

  consultations.push(entry);
  return entry.id;
}
