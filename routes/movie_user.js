import express from 'express';
import db from '../db.js';

const router = express.Router();

router.post('/', async (req, res) => {
    
    const { username, name, password, birth_year } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO movie_user (username, name, password, birth_year) VALUES ($1, $2, $3, $4) RETURNING *;',
            [username, name, password, birth_year]
        );
        res.status(201).end();
    } catch (err) { 
        res.status(500).json({ error: 'Failed to add user' });
    }
});


router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM movie_user;');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

//router.deled('/', async (req, res) => {
    //const { username, name, password, birth_year } = req.body;
   // try {
        //const result = await db.query(
            //'DELED movie_user (username, name, password, birth_year) VALUES ($1, $2, $3, $4) RETURNING *;',
           // [username, name, password, birth_year]
        //);
       // res.status(201).json(result.rows[0]);
   // } catch (err) {
       // res.status(500).json({ error: 'Failed to add user' });
   // }
//});

export default router;