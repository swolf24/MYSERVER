import express from 'express';
import db from '../db.js';

const router = express.Router();

// POST /favoritemovies
router.post('/', async (req, res) => {
    const { username, movieid, title } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO favoritemovies (username, movieid, title) VALUES ($1, $2, $3) RETURNING *',
            [username, movieid, title]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /favoritemovies
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM favoritemovies;');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch favorite movies' });
    }
});

export default router;