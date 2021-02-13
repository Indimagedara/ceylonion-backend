const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

var materialRouter = require('./routes/materials')
var materialStockRouter = require('./routes/material-stock')

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}..`)
});

app.get('/',(req,res)=>{
    console.log('You are not allowed to be here');
    res.send('You are not allowed to be here');
})

app.use('/materials', materialRouter);
app.use('/materialstock', materialStockRouter);