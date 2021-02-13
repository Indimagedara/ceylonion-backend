const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

var materialRouter = require('./routes/materials')
var materialStockRouter = require('./routes/material-stock')
var customersRouter = require('./routes/customers')
var employeeRolesRouter = require('./routes/employee-roles')
var employeesRouter = require('./routes/employees')
var businessTypeRouter = require('./routes/business-type')

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
app.use('/customers', customersRouter);
app.use('/employee-roles', employeeRolesRouter);
app.use('/employees', employeesRouter);
app.use('/business-type', businessTypeRouter);