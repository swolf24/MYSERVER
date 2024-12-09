import express from 'express';
const router = express.Router();

// route for adding a review
router.post('/reviews', (req, res) => {
    const { username, movie_id, stars, review_text } = req.body;

    // Placeholder 
    res.json({
        message: `Review added for movie ID ${movie_id} by ${username}`,
        stars,
        review_text,
    });
});


export default router;