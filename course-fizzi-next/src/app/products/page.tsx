import { Metadata } from "next";
import Link from "next/link";
import { FizziLogo } from "@/components/FizziLogo";
import Product3DCard from "@/components/Product3DCard";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop - Fizzy",
  description: "Browse our range of premium Fizzy beverages. Available in 1L Tetrapak format with wholesale pricing.",
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-100 via-green-50 to-sky-50">
      {/* Header */}
      <header className="border-b border-sky-200 bg-white/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="inline-block">
            <FizziLogo className="h-12 text-sky-800 hover:opacity-80 transition-opacity" />
          </Link>
          <h1 className="text-2xl font-bold text-sky-900">Our Products</h1>
          <div className="w-12" /> {/* Spacer for balance */}
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-sky-950 mb-4">
            Fizzy Beverages
          </h2>
          <p className="text-xl text-sky-800 max-w-2xl mx-auto">
            Premium 1L Tetrapak beverages with wholesale pricing available for bulk orders
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {products.map((product, index) => (
            <Product3DCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>

        {/* Wholesale Section */}
        <section className="mt-16 bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h3 className="text-3xl font-bold text-sky-950 mb-4">Wholesale Pricing Available</h3>
          <p className="text-lg text-sky-800 mb-6">
            Looking to stock Fizzy beverages at your business? We offer competitive wholesale pricing for bulk orders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-orange-50 rounded-lg p-6">
              <h4 className="font-bold text-orange-600 text-lg mb-2">Bulk Orders (10-49 units)</h4>
              <p className="text-sky-800">Save up to 37% per unit on retail price</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <h4 className="font-bold text-orange-600 text-lg mb-2">Medium Wholesale (50-99 units)</h4>
              <p className="text-sky-800">Save up to 50% per unit on retail price</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <h4 className="font-bold text-orange-600 text-lg mb-2">Large Wholesale (100+ units)</h4>
              <p className="text-sky-800">Save up to 56% per unit on retail price</p>
            </div>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Request Wholesale Quote
          </button>
        </section>
      </div>
    </main>
  );
}
