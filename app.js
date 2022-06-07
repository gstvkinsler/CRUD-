const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();
const urlencodeParser=bodyParser.urlencoded({extended: false});
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'crud-selettra',
});
//
const hbs = handlebars.create({ defaultLayout:'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


app.use("/css", express.static('css'));
app.use("/js", express.static('js'));
app.use("/images", express.static('images'));


//Routes and Templates

app.get("/", function(req, res){
    res.render('cadastrar')
})
//Start Server

app.listen(4004, function(req, res){
    console.log('servidor esta rodando')
});

app.post("/controllerForm",urlencodeParser,function(req,res){
    sql.query('insert into usuarios (nome,email,telefone,endereco) values(?,?,?,?)',[req.body.nome, req.body.email, req.body.telefone, req.body.endereco])
    res.redirect('/list')
}); 

app.get("/list", function(req, res){
    sql.query('select * from usuarios',function(err, results, fields){
        res.render('list',{data:results})
        
    });
});
app.get("/delete/:id", function(req, res){
    sql.query('delete from usuarios where id = ?',[req.params.id]);
    res.redirect('/list')
});

app.get("/usuario/:id", function(req, res){
    sql.query('select * from usuarios where id = ?',[req.params.id], function(err, results, fields){
        console.log(results)
        res.render('usuarios',{data:results})
    });

});

app.get("/edit/:id", function(req, res){
    sql.query('select * from usuarios where id = ?',[req.params.id], function(err, results, fields){
        console.log(results)
        res.render('edit',{data:results})
    });
});  

app.post("/update/:id",urlencodeParser,function(req,res){
    sql.query('update usuarios set nome = ?,email = ?,telefone = ?,endereco = ? where id = ?',[req.body.nome, req.body.email, req.body.telefone, req.body.endereco, req.params.id])
    res.redirect('/list')
    console.log(req.body)
}); 