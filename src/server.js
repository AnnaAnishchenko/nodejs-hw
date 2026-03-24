// src/server.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import notesRouter from './routes/notesRoutes.js';

// import pino from 'pino-http';

const app = express();

// Використовуємо значення з .env або дефолтний порт 3000
const PORT = process.env.PORT ?? 3000;

// Глобальні middleware
app.use(logger);

app.use(
  express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }),
);

app.use(cors());

// app.use(pino());

app.use(notesRouter); // підключаємо групу маршрутів нотаток

app.use(notFoundHandler); // 404 — якщо маршрут не знайдено
app.use(errorHandler); // Error — якщо під час запиту виникла помилка

await connectMongoDB(); // підключення до MongoDB

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
