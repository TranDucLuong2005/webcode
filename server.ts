import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './src/server/models/user.model.ts';
import authRoutes from './src/server/routes/auth.routes.ts';
import productRoutes from './src/server/routes/product.routes.ts';
import orderRoutes from './src/server/routes/order.routes.ts';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic security
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for Vite dev mode
  }));
  app.use(cors());
  app.use(express.json());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });
  app.use('/api/', limiter);

  // Database connection (Using a fallback for demo if URI is missing)
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/digipremier_dev';
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

  // Admin initial setup (Seeding)
  const seedAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@digipremier.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      await User.create({
        name: 'System Admin',
        email: adminEmail,
        password: adminPassword,
        isAdmin: true
      });
      console.log('👑 Default Admin created');
    }
  };
  seedAdmin();

  // --- API Routes ---

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Hệ thống DigiPremier đang hoạt động' });
  });

  // --- Vite Middleware for Development ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
