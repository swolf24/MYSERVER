import express from 'express';
const router = express.Router();


router.post('/users', (req, res) => {
    const { username, name, password, year_of_birth } = req.body;

    // Placeholder 
    res.json({
        message: `User ${username} registered successfully!`,
        name,
        year_of_birth,
    });
});


export default router;