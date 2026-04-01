// src/routes/authRoutes.js

import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

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
