var http = require('http');
var url = require('url');

var arDrone = require('ar-drone');
var client  = arDrone.createClient();



//client.on('navdata', console.log);

function drone_fancy(){

	console.log("Fancy dancing.");
	client.takeoff();
	
	client
	  .after(1000, function() {
	    this.clockwise(0.5);
	  })
	  .after(3000, function() {
	    this.stop();
	    this.land();
	  });
}


http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    if( url.parse(request.url).pathname == '/wait' ){
        var startTime = new Date().getTime();
        while (new Date().getTime() < startTime + 11000);
        response.write('Thanks for waiting!');
    }
    else if (url.parse(request.url).pathname == '/test'){
    	response.write("Flying...\n");
    	drone_fancy();
        response.write("Should have flown.\n");
    }
    else if (url.parse(request.url).pathname == '/takeoff'){
    	response.write("takoff...\n");
        client.takeoff(function(){ this.stop();});
        client.stop();
    }
    else if (url.parse(request.url).pathname == '/land'){
        response.write("landing...\n");
        client.land();
    }
    else if (url.parse(request.url).pathname == '/north'){
        response.write("moving north...\n");
        client.front(0.5);client.after(100,function(){
                this.front(0);
                this.stop();
                });
    }
    else if (url.parse(request.url).pathname == '/south'){
        response.write("moving south...\n");
        client.back(0.5);client.after(100,function(){
                this.back(0);
                this.stop();
                });
    }
    else if (url.parse(request.url).pathname == '/east'){
        response.write("moving east...\n");
        client.right(0.5);client.after(100,function(){
                this.right(0);
                this.stop();
                });
    }
    else if (url.parse(request.url).pathname == '/west'){
        response.write("moving west...\n");
        client.left(0.5);client.after(100,function(){
                this.left(0);
                this.stop();
                });
    }
    else if (url.parse(request.url).pathname == '/stop'){
        response.write("stopping...\n");
        client.stop();
    }
    else if (url.parse(request.url).pathname == '/up'){
        response.write("moving up...\n");
        client.up(0.5);
        client.after(100,function(){
                this.up(0);
                this.stop();
                });
    }
    else if (url.parse(request.url).pathname == '/down'){
        response.write("moving down...\n");
        client.down(0.5);client.after(100,function(){
                this.down(0);
                this.stop();
                });
    }
    else if (url.parse(request.url).pathname == '/reset'){
        response.write("resetting...\n");
        client.disableEmergency();
    }
    else{
	response.write( "this is your route: " + url.parse(request.url).pathname);
        response.write('\nHello!\n');
    }

    response.end();
}).listen(8080);

console.log('Server started');
