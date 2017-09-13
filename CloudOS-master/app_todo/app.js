var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/main');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
    var todo_schema = new mongoose.Schema({name: String, isdone: Boolean});
    var todo = mongoose.model('todos', todo_schema);
    
    var todoone = new todo({name: 'Whats up?'});
    todoone.save(function (err){
        if(err) console.error(err);
    });
    var todotwo = new todo({name: 'Yo?'});
    todotwo.save(function (err){
        if(err) console.error(err);
    });
});

app.use(express.logger({format: ':remote-addr :method :url'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(app.router);
app.use(express.errorHandler());

app.set('view engine', 'jade');
app.set('views', './views');

app.get('/', function(req, res){
    res.render('index');
});

app.post('/addAction', function(req, res, next){
    res.send(req.body.action);
});

http.createServer(app).listen(process.env.PORT, function(){
    console.log("To-do app started");
})