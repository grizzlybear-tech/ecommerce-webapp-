"use client";

import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import Link from "next/link";

export default function CartPage() {
    const { cartItems, removeFromCart, increaseQty, decreaseQty } = useCart();

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-100 p-4 md:p-10">
                <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
                    <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-500 mb-6">Your cart is currently empty.</p>
                            <Link
                                href="/"
                                className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col gap-6 mb-8">
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="flex flex-col md:flex-row items-center justify-between border-b pb-6"
                                    >
                                        <div className="flex items-center gap-4 w-full md:w-1/3 mb-4 md:mb-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <Link
                                                href={`/product/${item._id}`}
                                                className="font-semibold text-lg hover:underline"
                                            >
                                                {item.name}
                                            </Link>
                                        </div>

                                        <div className="text-lg font-medium w-full md:w-1/6 text-center md:text-left mb-4 md:mb-0">
                                            ${item.price.toFixed(2)}
                                        </div>

                                        <div className="flex items-center justify-center md:justify-start gap-4 w-full md:w-1/6 mb-4 md:mb-0">
                                            <button
                                                onClick={() => decreaseQty(item._id)}
                                                className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition font-bold"
                                            >
                                                −
                                            </button>
                                            <span className="text-lg w-6 text-center">{item.qty}</span>
                                            <button
                                                onClick={() => increaseQty(item._id)}
                                                className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition font-bold"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="w-full md:w-1/6 text-center md:text-left text-lg font-bold mb-4 md:mb-0">
                                            ${(item.price * item.qty).toFixed(2)}
                                        </div>

                                        <div className="w-full md:w-1/6 text-center md:text-right">
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className="text-red-500 hover:text-red-700 font-medium transition px-4 py-2 border border-red-500 rounded hover:bg-red-50"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-6 rounded border">
                                <h2 className="text-2xl font-bold mb-4 md:mb-0">
                                    Total: ${totalPrice.toFixed(2)}
                                </h2>
                                <Link href="/checkout" className="w-full md:w-auto bg-black text-white px-8 py-3 rounded text-lg font-medium hover:bg-gray-800 transition text-center">
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
