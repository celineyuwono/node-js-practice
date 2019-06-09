const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection; // db is used below // Line ini ga harus

// Check connection
db.once('open', function() {
    console.log('Connected to mongodb.');
})
// Check for DB errors
db.on('error', function(err) {
    console.log(err);
})

// Init app
const app = express();

// Bring in Models
let RequireArticle = require('./models/article'); // ./models/article is article.js

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Home Route
// err, articles --> articles is DB collection name
app.get('/', function(req, res){
    RequireArticle.find({}, function(err, articles){
        if(err){
            console.log(err);
        }
        else{
            res.render('index', {
                title: 'Articles',
                articles: articles
            });
        }
    });
});

// Add Route
app.get('/articles/add', function(req,res){
    res.render('add_article',{
        title: 'Add Article'
    });
});

app.post('/articles/add', function(req,res){
    console.log('Submitted');
    let article = new RequireArticle();
     // Require input body (req.body) of title author body, or not error
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save(function(err){
        if(err){
            console.log(err);
            return;
        } else{
            res.redirect('/');
        }
    });
});

// Get single article, NOTE!! habis (err, x), x bisa apa aja
app.get('/article/:id', function(req,res){
    RequireArticle.findById(req.params.id, function(err, article){
        res.render('article',{
            article: article
        });
    });
});

app.listen(3000, function(){
    console.log('Server started on port 3000...')
});