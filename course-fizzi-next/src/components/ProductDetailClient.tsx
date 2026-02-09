"use client";

import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Group } from "three";
import FloatingCan from "@/components/FloatingCan";
import WholesaleQuoteForm from "@/components/WholesaleQuoteForm";
import { Product, getWholesalePrice } from "@/data/products";

type ProductDetailClientProps = {
  product: Product;
};

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState<"retail" | "wholesale">("retail");
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const containerRef = useRef<Group>(null);

  const isWholesale = quantity >= 10;
  const currentPrice =
    orderType === "wholesale" && isWholesale
      ? getWholesalePrice(product, quantity)
      : product.pricing.retail * quantity;

  const perUnitPrice = currentPrice / quantity;
  const savings =
    orderType === "wholesale" && isWholesale
      ? ((product.pricing.retail - perUnitPrice) / product.pricing.retail) * 100
      : 0;

  const applicableTier = product.pricing.wholesale.find(
    (tier) => quantity >= tier.minQuantity
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 3D Product Display */}
        <div className="flex flex-col">
          <div className="relative h-96 lg:h-full min-h-96 rounded-lg bg-gradient-to-b from-sky-100 to-sky-50 shadow-lg overflow-hidden">
            <Canvas
              className="absolute inset-0 h-full w-full"
              camera={{ position: [0, 0, 15], fov: 50 }}
            >
              <PerspectiveCamera
                makeDefault
                position={[0, 0, 15]}
                fov={50}
              />
              <ambientLight intensity={0.8} />
              <directionalLight
                position={[10, 10, 10]}
                intensity={0.8}
                castShadow
              />
              <directionalLight
                position={[-10, -10, 5]}
                intensity={0.3}
              />
              
              <group ref={containerRef}>
                <FloatingCan
                  flavor={product.flavor}
                  floatSpeed={1.5}
                  rotationIntensity={0.6}
                  floatIntensity={0.8}
                  floatingRange={[-0.5, 0.5]}
                />
              </group>
            </Canvas>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Interactive 3D model - scroll to zoom, drag to rotate
          </p>
        </div>

        {/* Product Information & Ordering */}
        <div className="flex flex-col justify-start">
          <h1 className="text-4xl font-black text-sky-950 mb-2">
            {product.name}
          </h1>
          <p className="text-lg text-sky-800 mb-6">
            {product.description}
          </p>

          {/* Characteristics */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-sky-950 mb-4">
              Product Characteristics
            </h3>
            <ul className="space-y-2">
              {product.characteristics.map((char, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sky-800"
                >
                  <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mr-3" />
                  {char}
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing & Order Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-2xl font-bold text-sky-950 mb-6">
              Order & Pricing
            </h3>

            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Quantity (Units)
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2 border-2 border-sky-200 rounded-lg focus:outline-none focus:border-orange-500 text-lg"
              />
              <p className="text-xs text-gray-500 mt-2">
                Minimum 10 units for wholesale pricing
              </p>
            </div>

            {/* Order Type Toggle */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-sky-900 mb-2">
                Order Type
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => setOrderType("retail")}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                    orderType === "retail"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Retail
                </button>
                <button
                  onClick={() => setOrderType("wholesale")}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                    orderType === "wholesale"
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Wholesale
                </button>
              </div>
            </div>

            {/* Wholesale Tiers Display */}
            {orderType === "wholesale" && (
              <div className="mb-6 bg-orange-50 rounded-lg p-4">
                <h4 className="font-bold text-orange-600 mb-3">
                  Wholesale Pricing Tiers
                </h4>
                <div className="space-y-2 text-sm">
                  {product.pricing.wholesale.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between p-2 rounded ${
                        applicableTier?.minQuantity === tier.minQuantity
                          ? "bg-orange-200 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      <span>{tier.minQuantity}+ units</span>
                      <span>${tier.pricePerUnit.toFixed(2)}/unit</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Display */}
            <div className="bg-sky-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Per Unit Price:</span>
                <span className="text-xl font-bold text-sky-900">
                  ${perUnitPrice.toFixed(2)}
                </span>
              </div>
              {savings > 0 && (
                <div className="text-sm text-green-600 font-semibold mb-3">
                  You save {savings.toFixed(0)}% per unit!
                </div>
              )}
              <div className="border-t border-sky-200 pt-3 flex justify-between items-center">
                <span className="text-lg font-semibold text-sky-900">
                  Total Price:
                </span>
                <span className="text-3xl font-black text-orange-500">
                  ${currentPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add to Cart / Buy Button */}
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mb-3 text-lg">
              Add to Cart
            </button>

            {/* Wholesale Contact */}
            {orderType === "wholesale" && !showQuoteForm && (
              <button
                onClick={() => setShowQuoteForm(true)}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Request Custom Quote
              </button>
            )}
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-sky-800">
              <span className="font-semibold">💡 Tip:</span> For orders over 100 units, our sales team can provide custom packaging and delivery arrangements. Contact us for details.
            </p>
          </div>
        </div>

        {/* Wholesale Quote Form */}
        {showQuoteForm && (
          <div className="lg:col-span-2 mt-8">
            <button
              onClick={() => setShowQuoteForm(false)}
              className="text-sky-600 hover:text-sky-800 font-semibold mb-4"
            >
              ← Back
            </button>
            <WholesaleQuoteForm product={product} quantity={quantity} />
          </div>
        )}
      </div>
    </div>
  );
}
