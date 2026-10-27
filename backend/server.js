import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isPostgresConnected } from './config/db.js';
import { initStorage } from './data/store.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize local JSON storage fallback
initStorage();

// Connect to PostgreSQL (and auto-provision tables & seed data)
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'Jaishree Jewellers Luxury E-Commerce API',
    databaseEngine: 'PostgreSQL',
    postgresConnected: isPostgresConnected,
    timestamp: new Date().toISOString()
  });
});

const server = app.listen(PORT, () => {
  console.log(`\n👑 [Jaishree Jewellers PERN Server] Running on http://localhost:${PORT}`);
  console.log(`🐘 [Database Engine] PostgreSQL (node-postgres pool)`);
  console.log(`📦 [API Endpoints] /api/products | /api/orders | /api/auth | /api/health\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n⚠️ Port ${PORT} is currently in use by another process.`);
    console.error(`👉 Close the process on port ${PORT} or change PORT in backend/.env\n`);
  } else {
    console.error('Server error:', err);
  }
});
