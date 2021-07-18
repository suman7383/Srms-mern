const mongoose=require('mongoose');
const dotenv = require('dotenv');
const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');
const Admin = require('./models/adminSchema');

dotenv.config({path: './config.env'});
require('./db/conn');


const PORT=process.env.PORT;

app.use(cookieparser());
app.use(express.json());

app.use(require('./auth'));


app.listen(PORT,()=>{
    console.log('Server Listening');
});