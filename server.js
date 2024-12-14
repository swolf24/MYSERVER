import express from 'express'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';



import genreRoutes from './routes/genres.js';
import movieRoutes from './routes/movies.js';
import userRoutes from './routes/users.js';
import reviewRoutes from './routes/reviews.js';
import favoriteRoutes from './routes/favorites.js';

dotenv.config();

const app = express(); // I was reading that it is the saver variant
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// PostgreSQL connection

app.use(genreRoutes);
app.use(movieRoutes);
app.use(userRoutes);
app.use(reviewRoutes);
app.use(favoriteRoutes);

//define an endpoint

app.get('/',(req, res) => {

   // if  this endppoint is called 
        res.send('<h1>You just called root endpoint!!</h1>');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});