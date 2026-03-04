import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer">
            <div className="relative overflow-hidden aspect-[4/3] bg-gray-100 w-full">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1 flex-grow" title={product.name}>
                        {product.name}
                    </h2>
                    <span className="bg-black text-white text-sm font-bold px-2.5 py-1 rounded-md shrink-0">
                        ${product.price?.toFixed(2) || product.price}
                    </span>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">
                    {product.description || "Premium quality product."}
                </p>

                <Link
                    href={`/product/${product._id}`}
                    className="w-full inline-flex justify-center items-center bg-gray-50 text-black font-semibold px-4 py-3 rounded-xl border border-gray-200 hover:bg-black hover:text-white transition-colors duration-300 mt-auto"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
}