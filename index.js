const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer')
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/mongoose');

app.use(express.urlencoded({extended:true}));

app.use(expressLayouts);
app.use('/',require('./routes'));
app.use(express.static('assets'));

connectDB();
multer();

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.set('view engine','ejs');
app.set('views','./views')

app.listen(port,function(err){
    if(err){
        console.log(`error in connecting to server:${err}`);
    }
    console.log(`successfully connected to port:${port}`)
})