// src/server.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import notesRouter from './routes/notesRoutes.js';

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
app.use(cookieParser()); // Додаємо middleware для парсингу cookie

app.use(authRoutes); // підключаємо групу маршрутів аутентифікації
app.use(notesRouter); // підключаємо групу маршрутів нотаток

app.use(notFoundHandler); // 404 — якщо маршрут не знайдено

app.use(errors()); // обробка помилок від celebrate (валідація)

app.use(errorHandler); // Error — якщо під час запиту виникла помилка

await connectMongoDB(); // підключення до MongoDB

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
