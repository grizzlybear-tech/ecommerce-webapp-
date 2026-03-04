"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { useCart } from "../../../context/CartContext";
import { getProduct } from "../../../lib/api";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        alert("Product added to cart");
    };

    useEffect(() => {
        async function fetchProductData() {
            try {
                const data = await getProduct(id);
                setProduct(data);
            } catch (error) {
                console.error("Failed to load product", error);
            }
        }

        if (id) {
            fetchProductData();
        }
    }, [id]);

    if (!product) return <div className="p-10">Loading product...</div>;

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex items-center justify-center bg-gray-50/50">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-lg object-contain rounded-xl hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-100">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                                {product.name}
                            </h1>

                            <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                                ${product.price?.toFixed(2) || product.price}
                            </div>

                            <div className="prose prose-gray mb-8">
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mt-auto pt-8 border-t border-gray-100">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-black rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}