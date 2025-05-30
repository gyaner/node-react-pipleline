const express = require("express");
const cookieParser = require('cookie-parser');
const app=  express();
// Middleware 
app.use(express.json());
app.use(cookieParser());
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true, // Allow cookies dfg sdfs
  };
app.use(cors(corsOptions));

const productRoute= require('./routes/productRoute');
const authRoutes = require('./routes/authRoutes');



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product', productRoute);
module.exports=app;