
/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    tweets = require('./routes/tweets'),
    http = require('http'),
    path = require('path'),
    twitter = require("twitterclient");

//Twitter Auth Credentials
var client = new twitter.Client({
    key : '',
    secret : ''
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/search', function(req, res) {
    var term = req.query['q'];
    client.search(term,function(results){
        res.send(results) ;
    });
})

app.get('/tweet', tweets.findAll);
app.get('/tweet/:id', tweets.findById);
app.post('/tweet', tweets.add);
app.put('/tweet/:id', tweets.update);
app.delete('/tweet/:id', tweets.delete);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
