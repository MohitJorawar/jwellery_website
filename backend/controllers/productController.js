import { store } from '../data/store.js';
import { isPostgresConnected, pool } from '../config/db.js';

// Helper to format PostgreSQL row to Frontend camelCase format
const formatProduct = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    price: Number(row.price),
    originalPrice: row.original_price ? Number(row.original_price) : undefined,
    karat: row.karat,
    metal: row.metal,
    grossWeight: row.gross_weight,
    diamondWeight: row.diamond_weight,
    hallmark: row.hallmark,
    rating: Number(row.rating),
    reviewCount: Number(row.review_count),
    inStock: Boolean(row.in_stock),
    stockCount: Number(row.stock_count),
    isFeatured: Boolean(row.is_featured),
    isBestSeller: Boolean(row.is_bestseller),
    isNewArrival: Boolean(row.is_new_arrival),
    description: row.description,
    features: typeof row.features === 'string' ? JSON.parse(row.features) : row.features || [],
    availableSizes: typeof row.available_sizes === 'string' ? JSON.parse(row.available_sizes) : row.available_sizes || [],
    availableMetals: typeof row.available_metals === 'string' ? JSON.parse(row.available_metals) : row.available_metals || [],
    availableKarats: typeof row.available_karats === 'string' ? JSON.parse(row.available_karats) : row.available_karats || [],
    images: typeof row.images === 'string' ? JSON.parse(row.images) : row.images || []
  };
};

// Get all products with filters, search, sorting
export const getProducts = async (req, res) => {
  try {
    const { category, metal, minPrice, maxPrice, search, sort, featured } = req.query;

    if (isPostgresConnected && pool) {
      let query = 'SELECT * FROM products WHERE 1=1';
      const params = [];
      let paramIndex = 1;

      if (category && category !== 'All') {
        const cleanCat = category.trim().toLowerCase().replace(/s$/, '');
        query += ` AND (LOWER(category) = LOWER($${paramIndex}) OR LOWER(category) LIKE '%' || $${paramIndex} || '%')`;
        params.push(cleanCat);
        paramIndex++;
      }
      if (metal && metal !== 'All') {
        query += ` AND LOWER(metal) = LOWER($${paramIndex++})`;
        params.push(metal);
      }
      if (featured === 'true') {
        query += ` AND is_featured = true`;
      }
      if (minPrice) {
        query += ` AND price >= $${paramIndex++}`;
        params.push(Number(minPrice));
      }
      if (maxPrice) {
        query += ` AND price <= $${paramIndex++}`;
        params.push(Number(maxPrice));
      }
      if (search) {
        query += ` AND (LOWER(name) LIKE $${paramIndex} OR LOWER(description) LIKE $${paramIndex} OR LOWER(category) LIKE $${paramIndex})`;
        params.push(`%${search.toLowerCase()}%`);
        paramIndex++;
      }

      if (sort === 'price-asc') query += ' ORDER BY price ASC';
      else if (sort === 'price-desc') query += ' ORDER BY price DESC';
      else if (sort === 'rating') query += ' ORDER BY rating DESC';
      else query += ' ORDER BY created_at DESC';

      const result = await pool.query(query, params);
      const products = result.rows.map(formatProduct);

      return res.json({
        success: true,
        database: 'PostgreSQL',
        count: products.length,
        data: products
      });
    }

    // Local JSON Fallback Mode
    let products = store.getProducts();

    if (category && category !== 'All') {
      const c = category.toLowerCase().replace(/s$/, '');
      products = products.filter(p => {
        const pCat = p.category.toLowerCase().replace(/s$/, '');
        return pCat === c || pCat.includes(c) || c.includes(pCat);
      });
    }
    if (metal && metal !== 'All') {
      products = products.filter(p => p.metal.toLowerCase() === metal.toLowerCase());
    }
    if (featured === 'true') {
      products = products.filter(p => p.isFeatured);
    }
    if (minPrice) {
      products = products.filter(p => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= Number(maxPrice));
    }
    if (search) {
      const s = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s)
      );
    }

    if (sort === 'price-asc') products.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') products.sort((a, b) => b.rating - a.rating);

    res.json({
      success: true,
      database: 'LocalStore (Postgres Ready)',
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single product by slug or id
export const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    if (isPostgresConnected && pool) {
      const result = await pool.query(
        'SELECT * FROM products WHERE slug = $1 OR id = $1 LIMIT 1',
        [slug]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Jewelry piece not found' });
      }

      const product = formatProduct(result.rows[0]);
      const relatedResult = await pool.query(
        'SELECT * FROM products WHERE category = $1 AND id != $2 LIMIT 3',
        [product.category, product.id]
      );
      const related = relatedResult.rows.map(formatProduct);

      return res.json({
        success: true,
        database: 'PostgreSQL',
        data: product,
        related
      });
    }

    // Fallback store
    const all = store.getProducts();
    const product = all.find(p => p.slug === slug || p.id === slug);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Jewelry piece not found' });
    }

    const related = all.filter(p => p.category === product.category && p.slug !== product.slug).slice(0, 3);

    res.json({
      success: true,
      database: 'LocalStore (Postgres Ready)',
      data: product,
      related
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create product (Admin)
export const createProduct = async (req, res) => {
  try {
    const p = req.body;
    const slug = p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const id = p.id || `jj-prod-${Date.now()}`;

    if (isPostgresConnected && pool) {
      const result = await pool.query(
        `INSERT INTO products (
          id, name, slug, category, price, original_price, karat, metal, gross_weight, 
          diamond_weight, hallmark, rating, review_count, in_stock, stock_count, 
          is_featured, is_bestseller, is_new_arrival, description, features, 
          available_sizes, available_metals, available_karats, images
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
        RETURNING *;`,
        [
          id,
          p.name,
          slug,
          p.category,
          p.price,
          p.originalPrice || null,
          p.karat || '18K',
          p.metal || 'Yellow Gold',
          p.grossWeight || null,
          p.diamondWeight || null,
          p.hallmark || 'BIS 916 Hallmarked',
          p.rating || 5.0,
          p.reviewCount || 0,
          p.inStock !== undefined ? p.inStock : true,
          p.stockCount || 10,
          Boolean(p.isFeatured),
          Boolean(p.isBestSeller),
          Boolean(p.isNewArrival),
          p.description,
          JSON.stringify(p.features || []),
          JSON.stringify(p.availableSizes || []),
          JSON.stringify(p.availableMetals || []),
          JSON.stringify(p.availableKarats || []),
          JSON.stringify(p.images || [])
        ]
      );

      return res.status(201).json({
        success: true,
        database: 'PostgreSQL',
        data: formatProduct(result.rows[0])
      });
    }

    // Fallback store
    const newProduct = { ...p, id, slug };
    const products = store.getProducts();
    products.unshift(newProduct);
    store.saveProducts(products);

    res.status(201).json({ success: true, database: 'LocalStore', data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update product (Admin)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const p = req.body;

    if (isPostgresConnected && pool) {
      const result = await pool.query(
        `UPDATE products SET 
          name = COALESCE($1, name),
          category = COALESCE($2, category),
          price = COALESCE($3, price),
          original_price = $4,
          karat = COALESCE($5, karat),
          metal = COALESCE($6, metal),
          gross_weight = COALESCE($7, gross_weight),
          diamond_weight = COALESCE($8, diamond_weight),
          stock_count = COALESCE($9, stock_count),
          is_featured = COALESCE($10, is_featured),
          is_bestseller = COALESCE($11, is_bestseller),
          description = COALESCE($12, description),
          images = COALESCE($13, images),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $14 OR slug = $14
        RETURNING *;`,
        [
          p.name,
          p.category,
          p.price,
          p.originalPrice,
          p.karat,
          p.metal,
          p.grossWeight,
          p.diamondWeight,
          p.stockCount,
          p.isFeatured,
          p.isBestSeller,
          p.description,
          p.images ? JSON.stringify(p.images) : null,
          id
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Product not found in PostgreSQL' });
      }

      return res.json({
        success: true,
        database: 'PostgreSQL',
        data: formatProduct(result.rows[0])
      });
    }

    // Fallback store
    const products = store.getProducts();
    const index = products.findIndex(item => item.id === id || item.slug === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    products[index] = { ...products[index], ...p };
    store.saveProducts(products);

    res.json({ success: true, database: 'LocalStore', data: products[index] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete product (Admin)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isPostgresConnected && pool) {
      await pool.query('DELETE FROM products WHERE id = $1 OR slug = $1', [id]);
      return res.json({ success: true, database: 'PostgreSQL', message: 'Product retired from PostgreSQL' });
    }

    let products = store.getProducts();
    products = products.filter(p => p.id !== id && p.slug !== id);
    store.saveProducts(products);

    res.json({ success: true, database: 'LocalStore', message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Categories with Counts
export const getCategories = async (req, res) => {
  try {
    if (isPostgresConnected && pool) {
      const result = await pool.query(`
        SELECT category AS name, COUNT(*)::int AS count 
        FROM products 
        GROUP BY category
      `);
      return res.json({ success: true, database: 'PostgreSQL', data: result.rows });
    }

    const products = store.getProducts();
    const categoriesMap = {};
    products.forEach(p => {
      categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
    });

    const categories = Object.keys(categoriesMap).map(name => ({
      name,
      count: categoriesMap[name]
    }));

    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
