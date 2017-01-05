function Spider(id, x, y)
{
	this.id = id;
	this.position = new Vector(x, y);
	this.direction = new Vector(0, 0);
	this.speed = 15;
	this.size = 56;
	this.radians = 0;
	this.sprite = new Sprite();
	this.sprite.setImage(document.getElementById("img-spider-black"));
	this.sprite.setAspectRatio("auto");
	this.sprite.setSize("auto", this.size);
}

Spider.prototype.draw = function(ctx)
{
	this.sprite.draw(ctx, this.position, this.radians);
}

Spider.prototype.getPosition = function()
{
	return this.position;
}

Spider.prototype.setPosition = function(x, y)
{
	this.position = new Vector(x, y);
	console.log(this.position)
}

Spider.prototype.setDirection = function(vector)
{
	this.direction = vector.normalized();
	this.radians = this.direction.toRadians();
	this.radians += Math.PI / 2;
}

Spider.prototype.move = function(dt)
{
	var movement = this.direction.copy();
	movement.multiplyBoth(this.speed * dt);
	this.position.addVector(movement);
	this.constrainPosition(-500, -375, 500, 375);
}	

Spider.prototype.constrainPosition = function(x1, y1, x2, y2)
{
	if (this.position.x < x1)
		this.position.x = x1;
	else if (this.position.x > x2)
		this.position.x = x2;

	if (this.position.y < y1)
		this.position.y = y1;
	else if (this.position.y > y2)
		this.position.y = y2;
}