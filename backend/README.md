# E-Commerce Web App - Backend

This is the backend for the E-Commerce Web App, built with Node.js, Express, and MongoDB. It provides a RESTful API for managing users, products, orders, and shopping carts.

## Tech Stack
- **Node.js** & **Express.js** - Multi-routed REST API Server framework
- **MongoDB** & **Mongoose** - Database and Object Data Modeling (ODM)
- **JSON Web Tokens (JWT)** - Authorization protocols
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing validation

## Features
- **User Authentication:** Login and Registration pipelines passing JWT standard tokens.
- **Product Management:** Model-driven CRUD endpoints orchestrating the product directory.
- **Cart Management:** Stateful API endpoints designed for cart integration and calculations.
- **Order Processing:** End-to-end checkout API integrating cart items alongside structured shipping addresses logic.
- **Global Error Handling:** Structured global Express middleware capturing system outages gracefully.

## Prerequisites
- Node.js installed
- MongoDB instance (local server or cloud Atlas cluster)

## Installation & Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root of the `backend` directory (do not commit this file to Git):
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```

4. **Run the server:**
   - **Development mode** (with auto-reload):
     ```bash
     npm run dev
     ```
   - **Production mode:**
     ```bash
     npm start
     ```
   The server will start on `http://localhost:5000`.

## Key API Endpoints
- **Users**: `POST /api/users/login`, `POST /api/users/register`
- **Products**: `GET /api/products`, `GET /api/products/:id`, `POST /api/products`
- **Orders**: `POST /api/orders` 
- **Cart**: `GET /api/cart`, `POST /api/cart`
