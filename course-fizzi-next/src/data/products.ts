export type Product = {
  id: string;
  name: string;
  flavor: "lemonLime" | "grape" | "blackCherry" | "strawberryLemonade" | "watermelon";
  description: string;
  characteristics: string[];
  pricing: {
    retail: number;
    wholesale: {
      minQuantity: number;
      pricePerUnit: number;
    }[];
  };
  image?: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Lemon Lime",
    flavor: "lemonLime",
    description: "Refreshing citrus blend with a crisp, clean taste. Perfect for any occasion.",
    characteristics: [
      "Natural citrus flavors",
      "Zero artificial sweeteners",
      "1L Tetrapak format",
      "100% recyclable packaging",
      "Rich in Vitamin C",
    ],
    pricing: {
      retail: 3.99,
      wholesale: [
        { minQuantity: 10, pricePerUnit: 2.5 },
        { minQuantity: 50, pricePerUnit: 2.0 },
        { minQuantity: 100, pricePerUnit: 1.75 },
      ],
    },
  },
  {
    id: "2",
    name: "Grape",
    flavor: "grape",
    description: "Bold and vibrant grape flavor with a smooth finish. A classic favorite.",
    characteristics: [
      "Premium grape concentrate",
      "Smooth, refreshing taste",
      "1L Tetrapak format",
      "100% recyclable packaging",
      "Naturally sourced ingredients",
    ],
    pricing: {
      retail: 3.99,
      wholesale: [
        { minQuantity: 10, pricePerUnit: 2.5 },
        { minQuantity: 50, pricePerUnit: 2.0 },
        { minQuantity: 100, pricePerUnit: 1.75 },
      ],
    },
  },
  {
    id: "3",
    name: "Black Cherry",
    flavor: "blackCherry",
    description: "Deep, rich cherry flavor with a hint of sweetness. Irresistibly smooth.",
    characteristics: [
      "Dark cherry blend",
      "Smooth, premium taste",
      "1L Tetrapak format",
      "100% recyclable packaging",
      "No artificial colors",
    ],
    pricing: {
      retail: 3.99,
      wholesale: [
        { minQuantity: 10, pricePerUnit: 2.5 },
        { minQuantity: 50, pricePerUnit: 2.0 },
        { minQuantity: 100, pricePerUnit: 1.75 },
      ],
    },
  },
  {
    id: "4",
    name: "Strawberry Lemonade",
    flavor: "strawberryLemonade",
    description: "Sweet strawberry meets tangy lemonade. A perfect summer refreshment.",
    characteristics: [
      "Fresh strawberry flavor",
      "Tangy lemonade blend",
      "1L Tetrapak format",
      "100% recyclable packaging",
      "Light and fruity",
    ],
    pricing: {
      retail: 3.99,
      wholesale: [
        { minQuantity: 10, pricePerUnit: 2.5 },
        { minQuantity: 50, pricePerUnit: 2.0 },
        { minQuantity: 100, pricePerUnit: 1.75 },
      ],
    },
  },
  {
    id: "5",
    name: "Watermelon",
    flavor: "watermelon",
    description: "Juicy watermelon flavor with a refreshing taste. Perfect for hot days.",
    characteristics: [
      "Natural watermelon flavor",
      "Light and refreshing",
      "1L Tetrapak format",
      "100% recyclable packaging",
      "Sugar-free option available",
    ],
    pricing: {
      retail: 3.99,
      wholesale: [
        { minQuantity: 10, pricePerUnit: 2.5 },
        { minQuantity: 50, pricePerUnit: 2.0 },
        { minQuantity: 100, pricePerUnit: 1.75 },
      ],
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getWholesalePrice(
  product: Product,
  quantity: number,
): number {
  const applicableTier = product.pricing.wholesale
    .reverse()
    .find((tier) => quantity >= tier.minQuantity);

  return applicableTier
    ? applicableTier.pricePerUnit * quantity
    : product.pricing.retail * quantity;
}
