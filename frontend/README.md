# E-Commerce Web App - Frontend

This is the frontend component of the E-Commerce application, built as a modern, high-performance React application using Next.js (App Router) and meticulously styled with Tailwind CSS.

## Tech Stack
- **Next.js (App Router v15+)** - React framework for robust Server-Side Rendering (SSR) and routing.
- **React** - Core UI interactive component library.
- **Tailwind CSS** - Utility-first CSS framework mapped for mobile responsive breakpoints.
- **Axios** - Promise-based stable HTTP client for backend requests.
- **React Context API** - Managing global centralized cart actions persistently mapped into `localStorage`.

## Features
- **Modern Responsive UI:** Complete device-responsive interface leveraging Tailwind grids and dynamic hover/scale transforms for premium e-commerce interaction.
- **Dynamic Product Catalogs:** Fully dynamic mapping of generic product templates connected natively to the backend API.
- **Global Shopping Cart Engine:** Real-time Context-driven shopping cart synchronized over `localStorage` supporting increment, decrement, wipe, and badge notifications.
- **Authentication Pipeline:** Complete UI forms gathering Login and Registration requests pushing standard JWT authorization headers safely.
- **Checkout Process:** Real-time multi-variable shipping form integrated perfectly against the API terminating in a completed order confirmation logic block. 

## Prerequisites
- Node.js installed on your machine.
- A running instance of the companion `backend` mapped out on port `5000`.

## Installation & Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root of the `frontend` directory securely defining the backend target server:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development terminal:**
   ```bash
   npm run dev
   ```
   Launch your browser and load `http://localhost:3000`.

## Build for Production
The system uses `output: "standalone"` configured within `next.config.mjs` optimized completely for deployments (like Vercel or custom Docker enclosures). To construct the deployable app, run:
```bash
npm run build
npm start
```
