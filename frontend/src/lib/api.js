const API_URL = "https://ecommerce-webapp-1-t5iv.onrender.com/api";

export async function getProducts() {
    const res = await fetch(`${API_URL}/products`, { cache: "no-store" });
    return res.json();
}

export async function getProduct(id) {
    const res = await fetch(`${API_URL}/products/${id}`, { cache: "no-store" });
    return res.json();
}

export async function loginUser(data) {
    const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store"
    });
    const json = await res.json();
    if (!res.ok) {
        throw { response: { data: json } };
    }
    return { data: json };
}

export async function registerUser(data) {
    const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-store"
    });
    const json = await res.json();
    if (!res.ok) {
        throw { response: { data: json } };
    }
    return { data: json };
}

export async function createOrder(orderData, token) {
    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderData),
        cache: "no-store"
    });
    const json = await res.json();
    if (!res.ok) {
        throw { response: { data: json } };
    }
    return { data: json };
}