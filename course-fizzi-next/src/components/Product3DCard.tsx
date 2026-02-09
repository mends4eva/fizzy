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
      <div className="group relative h-[500px] sm:h-[550px] lg:h-[600px] cursor-pointer overflow-hidden rounded-xl bg-gradient-to-b from-sky-100 to-sky-50 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
        {/* 3D Canvas */}
        <Canvas
          className="absolute inset-0 h-full w-full pointer-events-auto"
          camera={{ position: [0, 0, 20], fov: 45 }}
          dpr={[1, 2]}
          performance={{ min: 0.5 }}
        >
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 20]}
            fov={45}
          />
          <ambientLight intensity={1} />
          <directionalLight
            position={[15, 15, 15]}
            intensity={1}
            castShadow
          />
          <directionalLight
            position={[-15, -15, 8]}
            intensity={0.4}
          />
          
          <group ref={containerRef}>
            <FloatingCan
              flavor={product.flavor}
              floatSpeed={2.5}
              rotationIntensity={1.2}
              floatIntensity={1}
              floatingRange={[-0.5, 0.5]}
            />
          </group>
        </Canvas>

        {/* Product Info Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6 pointer-events-none">
          <h3 className="text-3xl font-black text-white">{product.name}</h3>
          <p className="text-base text-gray-100 mt-2 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 text-lg text-orange-300 font-bold">
            From ${product.pricing.retail}
          </div>
          <div className="mt-3 text-sm text-gray-300 font-semibold">
            Click to view details & wholesale pricing →
          </div>
        </div>
      </div>
    </Link>
  );
});

export default Product3DCard;
