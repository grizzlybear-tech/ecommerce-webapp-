import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../lib/api";

export const dynamic = 'force-dynamic';

export default async function Home() {
  let data = [];
  try {
    data = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error.message);
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black z-0"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Elevate Your Everyday
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Shop the latest collection of hand-picked, premium products built to last.
          </p>
          <a href="#products" className="inline-block bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors duration-300">
            Shop Now
          </a>
        </div>
      </div>

      {/* Main Content Grid */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
          <span className="bg-gray-200 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
            {data?.length || 0} Products
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {data?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}