// src/routes/authRoutes.js

import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js'; // Імпортуємо схеми валідації

import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js'; // Імпортуємо  контролери

const router = Router();

// Маршрут реєстрації
router.post('/auth/register', celebrate(registerUserSchema), registerUser);

// Маршрут логіну
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

// Маршрут логауту
router.post('/auth/logout', logoutUser);

// Маршрут оновлення сесії
router.post('/auth/refresh', refreshUserSession);
export default router;

// Маршрут запиту на скидання пароля
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);

// Маршрут для скидання пароля
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);
