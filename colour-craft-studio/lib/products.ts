export interface Product {
  id: number;
  brand_id: number;
  name: string;
  type: string;
  colour_range: string | null;
  description: string | null;
  brand_name?: string;
  brand_logo?: string | null;
}
