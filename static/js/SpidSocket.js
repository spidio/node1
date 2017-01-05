function SpidSocket(server)
{
	this.url = server;
	this.ws = new WebSocket(this.url);
	this.ws.onmessage = this.on_message.bind(this);
}

SpidSocket.prototype.sendPacket = function(data)
{
	var json = JSON.stringify(data);
	console.log("sending packet...",json)
	this.ws.send(json);
}

SpidSocket.prototype.on_message = function(message)
{
	this.on_packet_recieved(JSON.parse(message.data));
}

SpidSocket.prototype.on_packet_recieved = function(data)
{
	/*for (var name in data)
	{
		var props = data[name];
		var dir = props["dir"];
		var pos = props["pos"];

		if (dir !== undefined)
		{
			if (name == username)
			{
				if (pos !== undefined)
					game.player.setPosition(pos.x, pos.y);
				if (dir !== undefined)
					game.player.setDirection(new Vector(dir.x, dir.y));
			}
			else
			{
				if (game.players[name] === undefined)
				{	
					game.players[name] = new Spider(pos.x, pos.y, "black");
				}
				
				if (pos !== undefined)
					game.players[name].setPosition(pos.x, pos.y);
				if (dir !== undefined)
					game.players[name].setDirection(new Vector(dir.x, dir.y));
			}

		}
	}*/
}