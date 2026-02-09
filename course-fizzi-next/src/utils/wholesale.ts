import { Product } from "@/data/products";

export interface WholesaleOrder {
  productId: string;
  quantity: number;
  customerName: string;
  email: string;
  phone: string;
  company?: string;
  deliveryAddress: string;
  notes?: string;
  requestedAt: Date;
}

export interface WholesaleQuote {
  orderId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  subtotal: number;
  taxEstimate: number;
  shippingEstimate: number;
  finalTotal: number;
  validUntil: Date;
}

export function calculateWholesaleQuote(
  product: Product,
  quantity: number,
  taxRate: number = 0.08,
  shippingCostPerUnit: number = 0.5,
): Omit<WholesaleQuote, "orderId" | "validUntil"> {
  const applicableTier = product.pricing.wholesale
    .reverse()
    .find((tier) => quantity >= tier.minQuantity);

  const unitPrice = applicableTier
    ? applicableTier.pricePerUnit
    : product.pricing.retail;

  const subtotal = unitPrice * quantity;
  const taxEstimate = subtotal * taxRate;
  const shippingEstimate = quantity * shippingCostPerUnit;
  const finalTotal = subtotal + taxEstimate + shippingEstimate;

  return {
    product,
    quantity,
    unitPrice,
    totalPrice: subtotal,
    subtotal,
    taxEstimate,
    shippingEstimate,
    finalTotal,
  };
}

export function getWholesaleSavings(
  retailPrice: number,
  wholesalePrice: number,
): number {
  return ((retailPrice - wholesalePrice) / retailPrice) * 100;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}
