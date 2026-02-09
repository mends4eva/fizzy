"use client";

import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef, memo } from "react";
import Link from "next/link";
import { Group } from "three";
import FloatingCan from "@/components/FloatingCan";
import { Product } from "@/data/products";

type Product3DCardProps = {
  product: Product;
  index: number;
};

const Product3DCard = memo(function Product3DCard({
  product,
  index,
}: Product3DCardProps) {
  const containerRef = useRef<Group>(null);

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group relative h-96 cursor-pointer overflow-hidden rounded-xl bg-gradient-to-b from-sky-100 to-sky-50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
        {/* 3D Canvas */}
        <Canvas
          className="absolute inset-0 h-full w-full pointer-events-auto"
          camera={{ position: [0, 0, 8], fov: 35 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 8]}
            fov={35}
          />
          <ambientLight intensity={1.2} />
          <directionalLight
            position={[15, 15, 15]}
            intensity={1.2}
            castShadow
          />
          <directionalLight
            position={[-15, -15, 8]}
            intensity={0.5}
          />
          
          <group ref={containerRef} scale={2}>
            <FloatingCan
              flavor={product.flavor}
              floatSpeed={2.5}
              rotationIntensity={1.5}
              floatIntensity={1.2}
              floatingRange={[-0.5, 0.5]}
            />
          </group>
        </Canvas>

        {/* Product Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6 pointer-events-none">
          <h3 className="text-2xl font-bold text-white">{product.name}</h3>
          <p className="text-sm text-gray-200 mt-2 line-clamp-1">
            {product.description}
          </p>
          <div className="mt-3 text-lg text-orange-300 font-bold">
            From ${product.pricing.retail}
          </div>
          <div className="mt-2 text-xs text-gray-300 font-semibold">
            Click for details →
          </div>
        </div>
      </div>
    </Link>
  );
});

export default Product3DCard;
