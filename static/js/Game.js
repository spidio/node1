function Game()
{
	this.canvas;
	this.ctx;
	this.player;
	this.players = {};
	this.fps, this.fpsInterval, this.now, this.then, this.elapsed;
}

Game.prototype.init = function()
{
	this.initCanvas();
	this.initEvents();
	this.initCamera();
	this.initMainloop(60);
}

Game.prototype.initCanvas = function()
{
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.setGameDimensions(window.innerWidth, window.innerHeight);
}

Game.prototype.initCamera = function()
{
	this.cp = new CanvasPixels();
	this.cp.setCanvasSize(this.canvas.width, this.canvas.height);
	this.cp.setVirtualSize(1280);
	this.camera = new Camera();
	this.camera.setPosition(new Vector(0, 0));
	this.camera.setSize(this.cp.tovp(this.canvas.width), this.cp.tovp(this.canvas.height));
}

Game.prototype.initEvents = function()
{
	this.socketEvents();

	canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
	window.addEventListener("resize", this.handleWindowResize.bind(this));
}

Game.prototype.initMainloop = function(fps)
{
	this.fps = fps;
	this.fpsInterval = 1000 / fps;
	this.then = Date.now();

    requestAnimationFrame(this.tick.bind(this));
}

Game.prototype.setGameDimensions = function(width, height)
{
	this.canvas.width = width;
	this.canvas.height = height ;
}

Game.prototype.tick = function()
{
    requestAnimationFrame(this.tick.bind(this));

    this.now = Date.now();
    this.elapsed = this.now - this.then;

    if (this.elapsed >= this.fpsInterval)
    {
    	var dt = this.elapsed;
        this.then = this.now - (this.elapsed % this.fpsInterval);
        this.mainloop(dt / 1000, dt);
    }
}

Game.prototype.mainloop = function(dt, dtm)
{
	this.update(dt, dtm);
	this.draw(dt, dtm);
}

Game.prototype.update = function(dt, dtm)
{
	if (this.player === undefined) {
		console.log("undefined!",this.player);
		return;
	}

	this.player.move(dt);
	this.camera.setPosition(this.player.getPosition());

	for (var id in this.players)
	{
	 	var spider = this.players[id];
	// 	if (spider.speed != 0)
	// 		if (Math.random() < 5/100)
	// 		{
	// 			var vector = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1)
	// 			var vec = spider.direction;
	// 			vec.addVector(vector);
	// 			spider.setDirection(vec);
	// 		}
		spider.move(dt);
	}
}

Game.prototype.draw = function()
{
	if (this.player === undefined) {
		this.drawLoading();
		return;
	}

	this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	//this.drawLines(this.player.getX() % 18, this.player.getY() % 18);
	for (var name in this.players)
	{
		var spider = this.players[name];		
		spider.draw(this.ctx);
	}

	this.player.draw(this.ctx);
}

Game.prototype.drawLoading = function()
{
	this.ctx.font = "48px serif";
	this.ctx.fillText("Loading game", 80, 80);
}

Game.prototype.drawLines = function(offX, offY)
{
	//console.log("OFFSET =", offset)
	for (var i = 0; i <= 25; i++)
	{
		var y = i * 18 - offY;
		this.ctx.strokeStyle = "#eee";
		this.ctx.beginPath();
		this.ctx.moveTo(0, y);
		this.ctx.lineTo(800, y);
		this.ctx.stroke();
	}
	for (var j = 0; j <= 45; j++)
	{
		var x = j * 18 - offX;
		this.ctx.strokeStyle = "#eee";
		this.ctx.beginPath();
		this.ctx.moveTo(x, 0);
		this.ctx.lineTo(x, 450);
		this.ctx.stroke();	
	}
}