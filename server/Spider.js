var Vector = require('./Vector');

function Spider(id, x, y)
{
	this.id = id;
	this.position = new Vector(x, y);
	this.direction = new Vector(0, 0);
	this.speed = 15;
	// 90
	this.size = 56;
}

Spider.prototype.setDirection = function(vector)
{
	this.direction = vector.normalized();
}

Spider.prototype.move = function(dt)
{
	var movement = this.direction.copy();
	movement.multiplyBoth(this.speed * dt);
	this.position.addVector(movement);
	this.limitPositionBounds(-500, -375, 500, 375);
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

module.exports = Spider;