import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import dbConnect from './config/dbConnect.js';
import CourseRouter from './routes/courseRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

dbConnect();
app.listen(PORT, () => {
    console.log(`Server is listening at PORT:${PORT}`);
})

app.use('/api', CourseRouter);