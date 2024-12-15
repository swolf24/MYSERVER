import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM movie;');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

router.post('/', async (req, res) => {
    const { title, year, genre } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO movie (title, year, genre) VALUES ($1, $2, $3) RETURNING *;',
            [title, year, genre]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add movie' });
    }
});

export default router;
