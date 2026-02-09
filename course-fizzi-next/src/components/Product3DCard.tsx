"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, View } from "@react-three/drei";
import { useRef, ReactNode } from "react";
import Link from "next/link";
import { Group } from "three";
import FloatingCan from "@/components/FloatingCan";
import { Product } from "@/data/products";

type Product3DCardProps = {
  product: Product;
  index: number;
};

export default function Product3DCard({
  product,
  index,
}: Product3DCardProps) {
  const containerRef = useRef<Group>(null);

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative h-96 cursor-pointer overflow-hidden rounded-lg bg-gradient-to-b from-sky-100 to-sky-50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
        {/* 3D Canvas */}
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
              floatSpeed={2}
              rotationIntensity={0.5}
              floatIntensity={0.8}
              floatingRange={[-0.3, 0.3]}
            />
          </group>
        </Canvas>

        {/* Product Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4">
          <h3 className="text-2xl font-bold text-white">{product.name}</h3>
          <p className="text-sm text-gray-200 mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-2 text-orange-400 font-semibold">
            From ${product.pricing.retail}
          </div>
          <div className="mt-2 text-xs text-gray-300">
            Click to view details & wholesale pricing
          </div>
        </div>
      </div>
    </Link>
  );
}
