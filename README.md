# 👑 JaiShree Jwellers — Haute Joaillerie PERN E-Commerce Platform

A production-grade, full-stack **PERN (PostgreSQL, Express, React, Node.js)** luxury fine jewelry e-commerce platform inspired by the world-class editorial design of [Glymora](https://glymora.webflow.io/). 

Engineered specifically for client handover, easy maintenance, and commercial deployment with **PostgreSQL**.

---

## ✨ Key Features & Architectural Highlights

### 🐘 PostgreSQL Relational Architecture
- **Industry-Standard `pg` (node-postgres) Connection Pool:**
  - Robust SQL relational schema with ACID compliance and JSONB support for rich variant attributes.
  - Automatically provisions `products`, `orders`, and `users` tables on startup (`CREATE TABLE IF NOT EXISTS`).
  - Pre-seeded with 8 authentic luxury jewelry pieces and default user credentials.
  - Full support for cloud PostgreSQL providers: **Supabase**, **Neon.tech**, **Render PostgreSQL**, **Railway**, and **AWS RDS**.
- **Zero-Friction Hybrid Storage Architecture:**
  - **PostgreSQL Mode:** Connects automatically via `DATABASE_URL` in `backend/.env`.
  - **High-Speed Local JSON Fallback Mode:** If PostgreSQL is not yet running locally or connection is delayed, the system automatically falls back to an intelligent JSON file-based database (`backend/data/products.json`, `backend/data/orders.json`, `backend/data/users.json`).
  - **Result:** You can showcase the live application to your customer immediately with **zero database setup errors or crashes**, while remaining 100% PostgreSQL ready!

---

### 🎨 Visual & Editorial Excellence (Glymora Luxury Aesthetic)
- **High-Fashion Editorial Typography:** `Playfair Display`, `Cormorant Garamond`, and `Montserrat`.
- **Bespoke Luxury Palette:** Deep obsidian black (`#0a0a0c`), rich charcoal gold surfaces, champagne gold accents (`#d4af37`), hairline golden borders, and glassmorphism navbars.
- **Micro-Interactions & Transitions:**
  - **Hover Image Swap:** Displays hero product image in resting state and switches to model/detail view on card hover.
  - **Slide-out Cart Drawer:** Live subtotal calculation, free insured shipping threshold progress bar, quantity incrementors, and variant details.
  - **Interactive Mega Menu:** Direct access to curated collections (Royal Solitaires, Bridal Jadau, Diamond Drops, Modernist Cuffs).
  - **High-End Product Detail Page (PDP):**
    - Multi-angle high-resolution gallery thumbnails.
    - Metal finish selector with live gold preview swatches (Yellow Gold, Rose Gold, Platinum).
    - Gold purity selector (14K, 18K, 22K).
    - Ring size / bracelet length selection.
    - Purity hallmarks: BIS 916 Hallmark & IGI / GIA Diamond Certification guarantee.
    - Detailed accordion panels (Specifications, Purity Dossier, Armored Transit, Lifetime Resizing).
    - "You May Also Admire" related product recommendations.
- **Client Testimonials & Storytelling:** Verified owner reviews and 40-year heritage chronicle.
- **VIP Private Showroom Booking Modal:** Date, salon city, and time-slot scheduling.
- **WhatsApp Concierge Floating Button:** Instant connection to lead jewelry curators.

---

### ⚡ Dynamic PERN Stack Backend REST API (`/api/...`)
- `/api/products` — Full CRUD, category filtering, metal filtering, price range filter, sorting (price, newest, ratings), search.
- `/api/orders` — Order generation, unique dossier numbers (`JJ-2026-XXXX`), subtotal calculations, status updates.
- `/api/orders/stats` — Real-time business metrics (total sales, order volume, pending fulfillment).
- `/api/auth` — JWT authentication with role-based access control.

---

### 👑 Full Store Admin Dashboard (`/admin`)
Designed for store owners and administrators to manage their entire jewelry business:
- **Financial & Order Metrics:** Live total revenue (in ₹), total orders placed, pending fulfillment count, active inventory count.
- **Jewelry Catalog Manager:**
  - Add new jewelry pieces (title, category, price, karat, metal, gross weight, diamond carat, images, stock, descriptions).
  - Edit existing jewelry prices, inventory, and hallmarking.
  - Delete / retire pieces from the public catalog.
- **Order Fulfillment Manager:**
  - View client orders with customer name, phone, address, items, and payment method.
  - Update fulfillment statuses: `Confirmed` ➔ `Processing in Vault` ➔ `Dispatched (Armored Courier)` ➔ `Delivered`.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on v24)
- **npm** v9+
- Optional: PostgreSQL (or a free cloud database on [Neon.tech](https://neon.tech) / [Supabase.com](https://supabase.com))

### 2. Start Both Backend & Frontend Concurrently
From the root directory:
```bash
npm run dev
```

This single command launches:
- **Express Backend API (PostgreSQL):** `http://localhost:5000`
- **React Frontend (Vite):** `http://localhost:5173` (with built-in API proxy to port 5000)

---

## 🔐 Demo Credentials

To test the admin dashboard or customer checkout, use the one-click demo login buttons on the **Sign In** page, or use:

| Role | Email | Password | Access |
| :--- | :--- | :--- | :--- |
| **Store Administrator** | `admin@jaishree.com` | `admin123` | Full Admin Dashboard (`/admin`), Product CRUD, Order Status |
| **VIP Customer** | `client@example.com` | `client123` | Customer Portal, Order History, Wishlist |

---

## 🐘 PostgreSQL Configuration & Database Setup

### Connecting to Cloud PostgreSQL (Neon, Supabase, Render, Railway)
In `backend/.env`, simply set:
```env
DATABASE_URL=postgresql://user:password@ep-your-db.neon.tech/jaishree_jewellers?sslmode=require
```
The server will automatically detect the connection, create all required tables (`products`, `orders`, `users`), and seed the initial luxury catalog!

### Connecting to Local PostgreSQL
If you have local PostgreSQL installed on port 5432:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/jaishree_jewellers
```

You can also inspect the raw SQL schema at:
👉 [backend/models/schema.sql](file:///d:/Coding/Projects/jaishree_jwellers/backend/models/schema.sql)

---

## 📂 Project Directory Structure

```
jaishree_jwellers/
├── backend/
│   ├── config/
│   │   └── db.js                 # PostgreSQL connection pool & schema auto-migration
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, JWT issuance
│   │   ├── orderController.js    # Order creation, fulfillment, revenue stats
│   │   └── productController.js  # Catalog search, filtering, and SQL CRUD
│   ├── data/
│   │   ├── initialProducts.js    # Curated seeded luxury jewelry dataset
│   │   ├── store.js              # Persistent JSON store engine
│   │   ├── products.json         # Live products file
│   │   └── orders.json           # Live orders file
│   ├── models/
│   │   ├── schema.sql            # Native PostgreSQL table definitions (DDL)
│   │   ├── Order.js              # PostgreSQL Order table column references
│   │   └── Product.js            # PostgreSQL Product table column references
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   ├── orderRoutes.js        # /api/orders
│   │   └── productRoutes.js      # /api/products
│   ├── server.js                 # Express server entrypoint (PERN)
│   ├── .env                      # PostgreSQL credentials (DATABASE_URL, JWT_SECRET)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, MegaMenu, CartDrawer, ProductCard, Footer
│   │   ├── context/              # CartContext, WishlistContext, AuthContext
│   │   ├── pages/                # Home, Shop, ProductDetail, Checkout, AdminDashboard
│   │   ├── index.css             # Vanilla CSS luxury design system
│   │   ├── App.jsx               # Main SPA routing & global modal orchestration
│   │   └── main.jsx
│   ├── index.html                # Google Fonts & SEO metadata
│   ├── vite.config.js            # Vite build configuration with /api proxy
│   └── package.json
│
├── package.json                  # Root orchestration for concurrent dev execution
└── README.md                     # Documentation
```

---

## 💎 Promotional Discount Code
For testing checkout savings:
- Use code **`JAISHREE10`** at checkout for an instant **10% VIP Inaugural Privilege Discount**.
