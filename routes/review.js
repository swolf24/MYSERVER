import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM review');
        
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { username, stars, reviewtext, movieid } = req.body;
    try {
        
        const checkResult = await db.query(
            'SELECT * FROM review WHERE username = $1 AND movieid = $2',
            [username, movieid]
        );
// just for me because I need to regulate The things I try to insert 
        if (checkResult.rows.length > 0) {
            return res.status(400).json({ error: 'Review already exists for this user and movie.' });
        }

        const result = await db.query(
            'INSERT INTO review (username, stars, reviewtext, movieid) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, stars, reviewtext, movieid]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



/* router.delete('/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const result = await db.query(
            'DELETE FROM review WHERE reviewid = $1 RETURNING *',
            [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Review not found.' });
        }
        res.status(200).json({
            message: 'Review deleted successfully',
            deleted: result.rows[0]
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}); */

export default router;
