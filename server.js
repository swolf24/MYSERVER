import express from 'express'; 

var app = express(); 

app.listen(3001, () => {
    console.log('The server is running !!');
});

//Let's define an endpoint
//Comment

app.get('/',(req, res) => {

    //hwere we go if this endpoint is called (e.g. from browser)
        res.send('<h1>You just called root endpoint!!</h1>');
});
