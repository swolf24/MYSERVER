import express from 'express'; 
import bodyParser from 'body-parser';
import { Pool } from 'pg';
import dotenv from 'dotenv';

var app = express(); 

app.listen(3001, () => {
    console.log('The server is running !!');
});

//Let's define an endpoint

app.get('/',(req, res) => {

    //hwere we go if this endpoint is called (e.g. from browser)
        res.send('<h1>You just called root endpoint!!</h1>');
});
