import { Metadata } from "next";
import Link from "next/link";
import { FizziLogo } from "@/components/FizziLogo";
import { products, getProductById } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Fizzy`,
    description: product.description,
  };
}

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-100 via-green-50 to-sky-50">
      {/* Header */}
      <header className="border-b border-sky-200 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="inline-block">
            <FizziLogo className="h-12 text-sky-800 hover:opacity-80 transition-opacity" />
          </Link>
          <Link
            href="/products"
            className="text-sky-800 hover:text-sky-900 font-semibold transition-colors"
          >
            ← Back to Shop
          </Link>
        </div>
      </header>

      {/* Product Detail */}
      <ProductDetailClient product={product} />
    </main>
  );
}
