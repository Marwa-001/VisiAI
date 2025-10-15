// ------------------------------
// 🌐 VisiAI Backend Server
// ------------------------------

// Import core modules
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes (use .js extension for ESM)
import scanRoutes from "./routes/scan.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app: Express = express();
const PORT = process.env.PORT || 5000;

// ------------------------------
// 🧩 Middleware
// ------------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------------------
// 🚏 API Routes
// ------------------------------
app.use('/api/scan', scanRoutes);

// ------------------------------
// 💓 Health Check Route
// ------------------------------
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'VisiAI API is running smoothly 🚀',
  });
});

// ------------------------------
// ⚠️ Global Error Handler
// ------------------------------
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// ------------------------------
// 🚀 Start Server
// ------------------------------
app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});