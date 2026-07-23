export interface ProductImage {
  url: string;
  alt?: string | null;
}

export interface ProductVariant {
  id: string;
  name: string;
  price?: number | null;
}

export interface ProductWithRelations {
  id: string;
  slug: string;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  price?: number | null;
  oldPrice?: number | null;
  stock?: number | null;
  pieces?: number | null;
  isActive?: boolean;
  images?: ProductImage[];
  variants?: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId?: string | null;
  name: string;
  price: number;
  quantity: number;
  image?: string | null;
}

export interface AdminProduct {
  id: string;
  name: string;
  price: number | null;
  oldPrice: number | null;
  stock: number;
  isActive: boolean;
}

export interface AdminOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  status: string;
  paymentStatus?: string | null;
}
