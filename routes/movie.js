import express from 'express';
import db from '../db.js';

const router = express.Router();

//  Add a New Movie
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

// Paginated Movies (10 per page)
router.get('/pagination', async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = 10; 
  const offset = (page - 1) * limit;

  try {
    const result = await db.query(
      'SELECT * FROM movie ORDER BY movie_id LIMIT $1 OFFSET $2',
      [limit, offset]
    );

   
    const totalResult = await db.query('SELECT COUNT(*) FROM movie');
    const totalMovies = parseInt(totalResult.rows[0].count);
    const totalPages = Math.ceil(totalMovies / limit);

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      totalMovies: totalMovies,
      movies: result.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//Search by Keyword
router.get('/search', async (req, res) => {
  const { keyword } = req.query;

  try {
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    
    const result = await db.query(
      'SELECT * FROM movie WHERE title ILIKE $1 OR genre ILIKE $1',
      [`%${keyword}%`]
    );

    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No movies found for the given keyword' });
    }

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE 
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM movie WHERE movie_id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).json({
        message: 'Movie deleted successfully',
        deleted: result.rows[0]
      });
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;