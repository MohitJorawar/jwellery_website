-- Jaishree Jewellers PostgreSQL Database Schema
-- Run this script if manually provisioning tables in PostgreSQL / Supabase / Neon / Render / AWS RDS

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
