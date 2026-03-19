// src/routes/notesRoutes.js

import { Router } from 'express';
import { getNotes, getNotesById } from '../controllers/notesController.js';

const router = Router();

router.get('/notes', getNotes);

router.get('/notes/:noteId', getNotesById);

export default router;
