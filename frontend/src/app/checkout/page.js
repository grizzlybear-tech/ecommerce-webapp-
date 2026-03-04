"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../lib/api";

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, clearCart } = useCart();

    const [shippingAddress, setShippingAddress] = useState({
        address: "",
        city: "",
        postalCode: "",
        country: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Read user token securely
    const [token, setToken] = useState(null);
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) setToken(storedToken);
    }, []);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );

    const handleAddressChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            setError("Your cart is empty");
            return;
        }

        if (!token) {
            setError("You must be logged in to place an order");
            router.push("/login"); // Proactively redirect to login if auth is missing
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Remap frontend CartItem schema to backend OrderItem schema recursively
            const orderItems = cartItems.map(item => ({
                product: item._id, // Assumes '_id' aligns to Product _id model
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.qty // Convert 'qty' local nomenclature to 'quantity' backend nomenclature
            }));

            const { data } = await createOrder({
                orderItems,
                shippingAddress,
                totalPrice
            }, token);

            if (data._id) {
                // Wipe LocalStorage Cart Logic After Confirmation
                clearCart();
                alert(`Order placed successfully! Order ID: ${data._id}`);
                router.push("/");
            }
        } catch (err) {
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : "Failed to place the order"
            );
        } finally {
            setLoading(false);
        }
    };

    // Edge-case block render entirely if Cart is explicitly nil
    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <main className="min-h-screen bg-gray-50 p-10 flex text-center justify-center items-center">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                        <button onClick={() => router.push("/")} className="bg-black text-white px-6 py-2 rounded">
                            Go Back Shopping
                        </button>
                    </div>
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
                    {/* Left Frame: Shipping Inputs */}
                    <div className="flex-1 shrink-0 bg-white p-6 md:p-8 rounded-xl shadow border">
                        <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

                        {error && (
                            <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
                                {error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handlePlaceOrder}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    value={shippingAddress.address}
                                    onChange={handleAddressChange}
                                    className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:border-black transition"
                                    placeholder="123 Main St"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-5">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={shippingAddress.city}
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:border-black transition"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        required
                                        value={shippingAddress.postalCode}
                                        onChange={handleAddressChange}
                                        className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:border-black transition"
                                        placeholder="Zip / Postal"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    value={shippingAddress.country}
                                    onChange={handleAddressChange}
                                    className="w-full border border-gray-300 rounded px-4 py-2 outline-none focus:border-black transition"
                                    placeholder="Country"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full mt-6 bg-black text-white py-3 rounded-lg font-bold text-lg hover:bg-gray-800 transition ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Processing Order..." : "Place Order"}
                            </button>
                        </form>
                    </div>

                    {/* Right Frame: Order Summary */}
                    <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow border h-fit sticky top-20">
                        <h2 className="text-xl font-bold mb-4 pb-4 border-b">Order Summary</h2>
                        <div className="flex flex-col gap-4 mb-6">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold text-gray-800">{item.qty} x</span>
                                        <span className="truncate max-w-[150px]">{item.name}</span>
                                    </div>
                                    <span className="whitespace-nowrap font-medium">${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Grand Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
