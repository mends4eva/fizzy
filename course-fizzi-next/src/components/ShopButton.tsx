import Link from "next/link";

type ShopButtonProps = {
  className?: string;
};

export default function ShopButton({ className = "" }: ShopButtonProps) {
  return (
    <Link
      href="/products"
      className={`rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl ${className}`}
    >
      Shop Now
    </Link>
  );
}
