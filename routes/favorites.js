import express from 'express';
const router = express.Router();

// route for adding a favorite movie
router.post('/favorites', (req, res) => {
    const { username, movie_id } = req.body;

    //  placeholder 
    res.json({ message: `Favorite movie with ID ${movie_id} added for user ${username}` });
});

export default router;