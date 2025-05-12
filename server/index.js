import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import LeadRoutes from "./routes/LeadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import ValuationRoutes from "./routes/ValuationRoutes.js"
import morgan from "morgan";
import cookieParser from "cookie-parser";
// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan("dev"));
app.use(cookieParser());
// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use("/api",userRoutes);
app.use("/api",LeadRoutes);
app.use("/api",chatRoutes);
app.use("/api",ValuationRoutes);
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Credex API' });
});
app.use("/api/users",userRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 