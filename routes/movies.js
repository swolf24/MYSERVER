import express from 'express';
const router = express.Router();
router.post('/movies', async (req, res) => {
    const { name, year, genre } = req.body;
    try {const genreResult = await db.query('SELECT GenreID FROM Genre WHERE Name = $1', [genre]);
        if (genreResult.rows.length === 0) return res.status(404).json({ error: 'Genre not found' });

        const genreID = genreResult.rows[0].genreid;

        const result = await db.query(
            'INSERT INTO Movie (Title, Year, GenreID) VALUES ($1, $2, $3) RETURNING *',
            [name, year, genreID]
    );
        res.status(201).json(result.rows[0]);
} catch (err) {
        res.status(500).json({ error: 'Error adding movie' });
    }
});

router.get('/movies/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(`
            SELECT m.MovieID, m.Title, m.Year, g.Name AS Genre
            FROM Movie m
            JOIN Genre g ON m.GenreID = g.GenreID
            WHERE m.MovieID = $1
        `, [id]);

        if (result.rows.length === 0) return res.status(404).json({ error: 'Movie not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching movie' });
    }
});

export default router;