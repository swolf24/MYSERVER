import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { title, year, genre } = req.body;

  try {
      const result = await db.query(
          'INSERT INTO movie (title, year, genre) VALUES ($1, $2, $3) RETURNING *',
          [title, year, genre]
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
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM movie WHERE movie_id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Movie deleted', movie: result.rows[0] });
        } else {
            res.status(404).json({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
export default router;