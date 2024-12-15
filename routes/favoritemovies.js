import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM favoritemovies;');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch favorite movies' });
    }
});

export default router;