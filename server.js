const express = require('express');
const mongoose = require('mongoose');
const multer = require ('multer');
require('dotenv').config();

//Import project Routes
const photograper = require('./routes/photographer');


//initial app
const app = express();
const PORT = process.env.PORT || 4001;


// Middlewares
app.use(express.json({limit:"20mb"}));
app.use('/uploads',express.static('uploads'));


// connct to db and run the server
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(console.log('Connect to db'))
.then(app.listen(PORT,()=>console.log(`Server is running on Port: ${PORT}`)));



//Projects Routing
app.use('/photographer',photograper);



















