import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM movie_genre;');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch genres' });
    }
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO movie_genre (name) VALUES ($1) RETURNING *;',
            [name]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add genre' });
    }
});

export default router;