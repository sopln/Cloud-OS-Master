var http = require('http');
var express = require('express');
var app = express();

app.use(express.logger({format: ':remote-addr :method :url'}));
app.use(express.static('./public'));
app.use(express.responseTime());
app.use(app.router);
app.use(express.errorHandler());

app.set('view engine', 'jade');
app.set('views', './views');

app.all('/', function(req, res, next){
    res.set('Personal-noah', 'wassup g');
    next();
})
app.get('/', function(req, res){
    res.render('index');
});

app.get('/say-hello', function(req, res){
    res.render('hello');
});

http.createServer(app).listen(process.env.PORT, function(){
    console.log("Express app started");
    console.log(process.env.PORT);
});