const express = require('express');
const basicroutes = require('./src/routes')
const app = express();
const port = 3000;

app.get('/',(req,res)=> { 
    res.send("Hello World");
 });

 app.use('/api/v1/basicroutes' , basicroutes)

app.listen(port,()=> console.log(`app listing on port ${port}`));