const express = require('express');
const mongoose = require('mongoose');
const multer = require ('multer');
const cors = require('cors');
require('dotenv').config();

//Import project Routes
const photograper = require('./routes/photographer');
const yad3 = require('./routes/yad3');
const school = require('./routes/school');


//initial app
const app = express();
const PORT = process.env.PORT || 4001;


// Middlewares
app.use(cors());
app.use(express.json({limit:"20mb"}));
app.use('/uploads',express.static('uploads'));


// connct to db and run the server
mongoose.connect(process.env.MONGO_URI_DEV,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})
.then(console.log('Connect to db'))
.then(app.listen(PORT,()=>console.log(`Server is running on Port: ${PORT}`)));



//Projects Routing
app.use('/photographer',photograper);
app.use('/yad3',yad3);
app.use('/school',school);



















