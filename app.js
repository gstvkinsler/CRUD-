const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();


//
const hbs = handlebars.create({ defaultLayout:'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Routes and Templates

app.get("/:id?", function(req, res){
    // res.sendFile(__dirname+"views/layouts/main.handlebars");
    res.render('index');
});

//Start Server

app.listen(4004, function(req, res){
    console.log('servidor esta rodando')
});