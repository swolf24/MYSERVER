import express from 'express';
const router = express.Router();

// Add a new genre
router.post('/genres', async (req, res) => {
    const { name } = req.body;

    try {
        const result = await db.query('INSERT INTO Genre (Name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: 'Genre already exists or invalid input' });
    }
});

export default router;