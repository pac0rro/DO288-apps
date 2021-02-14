var restify = require('restify');

var controller = require('./controllers/items');

var db = require('./models/db');
var model = require('./models/items');

model.connect(db.params, function(err) {
    if (err) throw err;
});

var server = restify.createServer() 
    .use(restify.fullResponse())
    .use(restify.queryParser())
    .use(restify.bodyParser());
    
controller.context(server, '/todo/api', model); 

server.get(/\/todo\/?.*/, restify.serveStatic({
    'directory': __dirname,
    'default': 'index.html'
}));


console.log("Messsage to show: " + process.env.MESSAGE_TO_SHOW);

var port = process.env.PORT || 8080;
server.listen(port, function (err) {
    if (err)
        console.error(err);
    else
        console.log('App is ready at : ' + port);
});


/* 
process.on('uncaughtException', function (err) {
    console.error(JSON.parse(JSON.stringify(err, ['stack', 'message', 'inner'], 2)))
});
*/    

