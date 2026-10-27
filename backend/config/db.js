import pg from 'pg';
import dotenv from 'dotenv';
import { initialProducts } from '../data/initialProducts.js';

dotenv.config();

const { Pool } = pg;

export let isPostgresConnected = false;
export let pool = null;

export const connectDB = async () => {
  const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/jaishree_jewellers';

  try {
    const isCloud = connectionString.includes('render') || 
                    connectionString.includes('neon') || 
                    connectionString.includes('supabase');

    pool = new Pool({
      connectionString,
      connectionTimeoutMillis: 2000,
      ssl: isCloud ? { rejectUnauthorized: false } : false
    });

    // Prevent unhandled error events from crashing Node.js
    pool.on('error', (err) => {
      isPostgresConnected = false;
    });

    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();

    isPostgresConnected = true;
    console.log(`✨ [PostgreSQL] Connected successfully to host at ${result.rows[0].now}`);

    // Auto-create tables and seed data if needed
    await initPostgresSchema();
  } catch (error) {
    isPostgresConnected = false;
    if (pool) {
      try { await pool.end(); } catch (_) {}
      pool = null;
    }
    console.log(`💎 [PostgreSQL Status] Local PostgreSQL server not reachable at ${connectionString}.`);
    console.log(`⚡ [Storage Engine] Running in High-Speed Local JSON Datastore Mode with Full Persistence.`);
    console.log(`ℹ️ [Tip] To connect to a cloud PostgreSQL database, paste your connection string in backend/.env`);
  }
};

const initPostgresSchema = async () => {
  if (!pool || !isPostgresConnected) return;

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(100) NOT NULL,
        price NUMERIC NOT NULL,
        original_price NUMERIC,
        karat VARCHAR(20) DEFAULT '18K',
        metal VARCHAR(100) DEFAULT 'Yellow Gold',
        gross_weight VARCHAR(50),
        diamond_weight VARCHAR(100),
        hallmark VARCHAR(150) DEFAULT 'BIS 916 Hallmarked',
        rating NUMERIC DEFAULT 5.0,
        review_count INT DEFAULT 0,
        in_stock BOOLEAN DEFAULT TRUE,
        stock_count INT DEFAULT 10,
        is_featured BOOLEAN DEFAULT FALSE,
        is_bestseller BOOLEAN DEFAULT FALSE,
        is_new_arrival BOOLEAN DEFAULT FALSE,
        description TEXT NOT NULL,
        features JSONB DEFAULT '[]',
        available_sizes JSONB DEFAULT '[]',
        available_metals JSONB DEFAULT '[]',
        available_karats JSONB DEFAULT '[]',
        images JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(100) PRIMARY KEY,
        order_number VARCHAR(100) UNIQUE NOT NULL,
        customer JSONB NOT NULL,
        items JSONB NOT NULL,
        subtotal NUMERIC NOT NULL,
        shipping NUMERIC DEFAULT 0,
        discount NUMERIC DEFAULT 0,
        total_amount NUMERIC NOT NULL,
        payment_method VARCHAR(100) DEFAULT 'Prepaid',
        payment_status VARCHAR(50) DEFAULT 'Paid',
        order_status VARCHAR(50) DEFAULT 'Confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check count and seed if empty
    const check = await pool.query('SELECT COUNT(*) FROM products');
    if (parseInt(check.rows[0].count, 10) === 0) {
      console.log('📦 [PostgreSQL] Seeding initial luxury jewelry pieces into database...');
      for (const p of initialProducts) {
        await pool.query(
          `INSERT INTO products (
            id, name, slug, category, price, original_price, karat, metal, gross_weight, 
            diamond_weight, hallmark, rating, review_count, in_stock, stock_count, 
            is_featured, is_bestseller, is_new_arrival, description, features, 
            available_sizes, available_metals, available_karats, images
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
          ON CONFLICT (id) DO NOTHING;`,
          [
            p.id, p.name, p.slug, p.category, p.price, p.originalPrice, p.karat, p.metal,
            p.grossWeight, p.diamondWeight, p.hallmark, p.rating, p.reviewCount,
            p.inStock, p.stockCount, p.isFeatured, p.isBestSeller, p.isNewArrival,
            p.description, JSON.stringify(p.features || []), JSON.stringify(p.availableSizes || []),
            JSON.stringify(p.availableMetals || []), JSON.stringify(p.availableKarats || []),
            JSON.stringify(p.images || [])
          ]
        );
      }
    }
  } catch (err) {
    console.error('⚠️ [PostgreSQL] Schema error caught safely:', err.message);
  }
};
