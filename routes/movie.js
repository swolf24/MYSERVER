import express from 'express';
import db from '../db.js';

const router = express.Router();

// POST: Neuen Film hinzufügen
router.post('/', async (req, res) => {
  const { name, year, genre } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO movie (name, year, genre) VALUES ($1, $2, $3) RETURNING *',
      [name, year, genre]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM movie');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;