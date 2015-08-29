var Hapi = require('hapi')
var Path = require('path');
var ejs = require('ejs');
var Wreck = require('wreck')
var server = new Hapi.Server(); 
var client = require('./api_token.js')
var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({
  	port: 1234
});

server.connection({
	host: 'localhost',
	port:  3000
});

wss.on('connection', function connection(ws) {
    var ws = ws
	ws.on('message',function incoming(message){
		getTweetData(ws,message)
	});

	ws.on('close',function close(){
		"Connection has closed"
	});
});

function getTweetData(ws,message){
	client.stream('statuses/filter',{track: message},function(stream){
			stream.on('data', function(tweet){
				if(tweet.place){
					ws.send(JSON.stringify({name: tweet.text, fillKey: 'Bubble', screen_name: tweet.user.screen_name, radius: 10, latitude: tweet.place.bounding_box.coordinates[0][0][1], longitude: tweet.place.bounding_box.coordinates[0][0][0]}))
				}
			});
	});
}



server.views({
	engines: {ejs: ejs},
	path: "views",
	isCached: false
})

server.route({
	method: 'GET',
	path: '/public/{param*}',
	handler: {
        directory: {
            path: 'public'
        }
    }
})

server.route({
	method: 'GET',
	path: '/' ,
	handler: function(request,reply){	
		reply.view('index')

	}
	
});	
	
server.route({
	method: 'GET',
	path: '/tweets' ,
	handler: function(request,reply){

	}
	
});	




	


server.start();

