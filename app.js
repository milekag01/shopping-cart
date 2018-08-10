var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/',function(req,res){
    res.redirect('/products');
});

app.get('/products',function(req,res){
    res.render('index');
});

app.listen(8000,function(){
    console.log('Server started');
});