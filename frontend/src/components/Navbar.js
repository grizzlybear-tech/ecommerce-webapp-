"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { cartItems } = useCart();
    const cartCount = cartItems.length;

    return (
        <nav className="bg-black text-white p-4 flex justify-between items-center shadow-md">
            <Link href="/" className="text-xl font-bold tracking-wide">
                MyStore
            </Link>
            <div className="flex gap-6 items-center">
                <Link href="/cart" className="relative flex items-center hover:text-gray-300 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    <span>Cart</span>
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center min-w-[20px] h-[20px]">
                            {cartCount}
                        </span>
                    )}
                </Link>
                <Link href="/login" className="hover:text-gray-300 transition">Login</Link>
            </div>
        </nav>
    );
}