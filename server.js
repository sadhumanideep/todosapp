/*
Author: Manideep
File Version:0.1
Description: 1.Starts server,
             2.Connect to mongodb,
             3.passes the routes to routes folder via middle ware 
                -if no router servers url throws error
             4.uses body-parser for fectching the data from body of request,
               uses morgan for logging request in dev mode
*/

const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const port=8081;

const todosrouter=require('./routes/todos');
const userrouter=require('./routes/users')

mongoose.connect('mongodb://localhost/mydb');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/todos',todosrouter);
app.use('/users',userrouter);
app.use((req,res,next)=>{
    let error=new Error('not found');
    error.status=404;
    next(error);
});

app.use((error,req,res)=>{
    res.status(error.status|| 500).json({
        "message":error.message
    });
});


app.listen(port);

console.log(`server running on port${port}`);