import express from 'express';
const router = express.Router();
router.post('/movies', async (req, res) => {
    const { name, year, genre } = req.body;
    try {} catch (err) {
        res.status(500).json({ error: 'Error adding movie' });
    }