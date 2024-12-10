import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();

// Register a new user
router.post('/users', async (req, res) => {
    const { username, name, password, year_of_birth } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.query(
            'INSERT INTO "User" (Username, Name, Password, Birthyear) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, name, hashedPassword, year_of_birth]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: 'Error registering user' });
    }
});

export default router;