import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProducts } from './initialProducts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const USERS_FILE = path.join(__dirname, 'users.json');

// Ensure data files exist with default data
export const initStorage = () => {
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
  }

  if (!fs.existsSync(ORDERS_FILE)) {
    const sampleOrders = [
      {
        id: "jj-ord-1001",
        orderNumber: "JJ-2026-1001",
        customer: {
          name: "Pooja Sharma",
          email: "pooja.sharma@example.com",
          phone: "+91 98765 43210",
          address: "Flat 402, Royal Palms, Bandra West",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400050"
        },
        items: [
          {
            id: "jj-prod-001",
            name: "Celeste Royal Solitaire Diamond Ring",
            price: 84500,
            quantity: 1,
            selectedMetal: "Yellow Gold",
            selectedKarat: "18K",
            selectedSize: 14,
            image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop"
          }
        ],
        subtotal: 84500,
        shipping: 0,
        totalAmount: 84500,
        paymentMethod: "Prepaid (UPI / Card)",
        paymentStatus: "Paid",
        orderStatus: "Delivered",
        createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
      },
      {
        id: "jj-ord-1002",
        orderNumber: "JJ-2026-1002",
        customer: {
          name: "Rohit Singhania",
          email: "rohit.s@example.com",
          phone: "+91 98112 34567",
          address: "B-12, Greater Kailash Part 1",
          city: "New Delhi",
          state: "Delhi",
          postalCode: "110048"
        },
        items: [
          {
            id: "jj-prod-002",
            name: "Aurea Cascading Diamond Drop Earrings",
            price: 112000,
            quantity: 1,
            selectedMetal: "Rose Gold",
            selectedKarat: "18K",
            selectedSize: "Standard",
            image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop"
          }
        ],
        subtotal: 112000,
        shipping: 0,
        totalAmount: 112000,
        paymentMethod: "Cash on Delivery (Insured)",
        paymentStatus: "Pending",
        orderStatus: "Processing",
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(sampleOrders, null, 2));
  }

  if (!fs.existsSync(USERS_FILE)) {
    const sampleUsers = [
      {
        id: "usr-admin",
        name: "Jaishree Admin",
        email: "admin@jaishree.com",
        password: "admin123", // In a production setup, bcrypt hash
        role: "admin",
        createdAt: new Date().toISOString()
      },
      {
        id: "usr-client",
        name: "Ananya Mehta",
        email: "client@example.com",
        password: "client123",
        role: "customer",
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(sampleUsers, null, 2));
  }
};

// Store Operations
export const store = {
  getProducts: () => {
    try {
      const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
      return JSON.parse(data);
    } catch {
      return initialProducts;
    }
  },
  saveProducts: (products) => {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    return products;
  },
  getOrders: () => {
    try {
      const data = fs.readFileSync(ORDERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  },
  saveOrders: (orders) => {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
    return orders;
  },
  getUsers: () => {
    try {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  },
  saveUsers: (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    return users;
  }
};
