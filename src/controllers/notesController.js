// src/controllers/notesController.js

import { Note } from './models/note.js';
import createHttpError from 'http-errors';

export const getNotes = async (req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);
};

export const getNotesById = async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    throw createHttpError(404,'Note not found' );
  }
  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
};
