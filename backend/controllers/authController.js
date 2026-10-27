import jwt from 'jsonwebtoken';
import { store } from '../data/store.js';
import { isPostgresConnected, pool } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'jaishree_luxury_secret_key_2026_secure';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = null;
    if (isPostgresConnected && pool) {
      const result = await pool.query(
        'SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1',
        [email]
      );
      if (result.rows.length > 0) {
        user = result.rows[0];
      }
    }

    if (!user) {
      const users = store.getUsers();
      user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    if (!user || user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (isPostgresConnected && pool) {
      const existing = await pool.query(
        'SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1',
        [email]
      );
      if (existing.rows.length > 0) {
        return res.status(400).json({ success: false, message: 'Account already exists with this email' });
      }

      const id = `usr-${Date.now()}`;
      const result = await pool.query(
        'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [id, name, email, password, 'customer']
      );
      const newUser = result.rows[0];

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      });
    }

    // Fallback store
    const users = store.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return res.status(400).json({ success: false, message: 'Account already exists with this email' });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      password,
      role: 'customer',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    store.saveUsers(users);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ success: true, user: decoded });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
