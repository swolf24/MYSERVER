import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM movie');
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  });

router.post('/', async (req, res) => {
    try {
      const { title, year, genre } = req.body;
      const result = await pool.query(
        'INSERT INTO movie (title, year, genre) VALUES ($1, $2, $3) RETURNING *',
        [title, year, genre]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Failed to add movie' });
    }
  });

export default router;
