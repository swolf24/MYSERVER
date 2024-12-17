import express from 'express'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


import movie_genresRoutes from './routes/movie_genres.js';
import movieRoutes from './routes/movie.js';
import movie_userRoutes from './routes/movie_user.js';
import reviewRoutes from './routes/review.js';
import favoritemoviesRoutes from './routes/favoritemovies.js';

dotenv.config();

const app = express(); // I was reading that it is the saver variant
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());



app.use('/movie_genre',movie_genresRoutes);
app.use('/movie', movieRoutes);     
app.use('/movie_user', movie_userRoutes);      
app.use('/review', reviewRoutes);   
app.use('/favoritemovies', favoritemoviesRoutes);
//define an endpoint

app.get('/',(req, res) => {

   // if  this endppoint is called 
        res.send('<h1>You just called root endpoint!!</h1>');
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('POST /genres endpoint hit');

});