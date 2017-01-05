Game.prototype.socketEvents = function()
{
	socket.on('connect', data => {
        console.log("Connected to socket.io");
        //console.log(data)
    });

	socket.on('init', data => {
		//console.log(data);
		data.forEach(d => {
			var id = d.id;
			var spid = d.spider;
			var spider = new Spider(id, spid.position.x, spid.position.y);
			spider.setDirection(new Vector(spid.direction.x, spid.direction.y));
			//console.log('sockid',socket.id)
			//console.log(id,"==",socket.id,"=",id==socket.id)
			if (id == socket.id) {
				this.player = spider;
				console.log("Initialized player");
			} else {
				this.players[id] = spider;
			}
		});
	});

	socket.on('denit', data => {
		delete this.players[data.id];
	});

	socket.on('disconnect', data => {
		this.canvas.style.width = "0px";
		this.canvas.style.height = "0px";
		discon_div.style.display = "block";
		setTimeout(() => {
			location.reload();
		}, 2500);
	});
}

Game.prototype.handleWindowResize = function(evt)
{
	console.log("window resized!");
	this.setGameDimensions(window.innerWidth, window.innerHeight);
	this.initCamera();
}

Game.prototype.handleMouseMove = function(evt)
{
	//modmanager.callEvent('MouseMove', event);
	var mx = event.clientX;
	var my = event.clientY;

	mx = Math.round(mx * (this.canvas.width / this.canvas.offsetWidth));
	my = Math.round(my * (this.canvas.height / this.canvas.offsetHeight));

	//this.player.setDirection(new Vector(mx - window.innerWidth / 2, my - window.innerHeight / 2));						// FIX! VERY BAD AND MESSY CODE!!
	var dir = new Vector(mx - window.innerWidth / 2, my - window.innerHeight / 2);

	socket.emit('mousemove', dir);
}