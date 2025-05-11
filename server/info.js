import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI,
  adminEmail: process.env.ADMIN_EMAIL,
  openaiKey: process.env.OPENAI_KEY,
};
