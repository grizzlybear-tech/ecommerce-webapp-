export default function Footer() {
    return (
        <footer className="bg-black text-white mt-16">
            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-xl font-bold mb-4">MyStore</h2>
                    <p className="text-gray-400">
                        Premium products built for everyday life.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Shop</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>All Products</li>
                        <li>Featured</li>
                        <li>New Arrivals</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li>About</li>
                        <li>Contact</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>

            </div>

            <div className="text-center text-gray-500 pb-6">
                © {new Date().getFullYear()} MyStore. All rights reserved.
            </div>
        </footer>
    );
}