var al = require('../modules/advancelog');
var Spider = require('./Spider');
var Vector = require('./Vector');

var players = {};

function random(a, b)
{
	return Math.random() * (b - a) + a;
}

function game(io)
{
	io.on('connection', function(client) {

		al.info("Client connected!");

		var player = new Spider(client.id, random(-100, 100), random(-100, 100));
		player.setDirection(new Vector(random(-1, 1), random(-1, 1)));

		io.emit('init', [
			{
				'id': client.id,
				'spider': player,
			}
		]);

		var data = []

		for (var id in players)
		{
			var spider = players[id];
			data.push({
				'id': id,
				'spider': spider,
			});
		}

		client.emit('init', data);

		players[client.id] = player;

		client.on('disconnect', function() {

			al.info("Client disconnected!");

			delete players[client.id];

			io.emit('denit', {
				'id': client.id,
			});

		});

	});
}

module.exports = game;