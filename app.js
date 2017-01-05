var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var al = require('./modules/advancelog');

al.showDate();
al.info("Starting Server");

app.use('/static', express.static('static'));

require('./server/requests')(app, io);

var port = process.env.PORT || 8000;
server.listen(port);