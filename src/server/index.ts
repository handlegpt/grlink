import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import linksRouter from './routes/links';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/links', linksRouter);

// 连接数据库
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/grlink')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 