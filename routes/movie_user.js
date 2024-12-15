import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM movie_user;');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.post('/', async (req, res) => {
    const { username, name, password, birthyear } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO movie_user (username, name, password, birthyear) VALUES ($1, $2, $3, $4) RETURNING *;',
            [username, name, password, birthyear]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add user' });
    }
});

export default router;