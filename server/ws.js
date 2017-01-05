var al = require('../modules/advancelog')

//var mods = [];
var server_functions = {};
var connections = {};

function ws(app)
{
	al.DATE().info("Loading mods on server...");

	app.globvars_mod_names.forEach(mod => {
		//mods.push(require('./mods_server/' + mod))
		var mod = require('../mods_server/' + mod);
		Object.assign(server_functions, mod);
	});

	al.DATE().info("Mods loaded on server");
	al.DATE().info("Opening game socket...")

	app.ws('/ws', on_open)

	al.DATE().info("Game socket opened")
}

function on_open(ws, req)
{
	connections['walmart'] = ws;
	var on_message = function(message)
	{
		/*console.log("got message")
		do_nothing([ws, req, message])
		console.log('all is defined woo! :)')*/
		on_packet('walmart', JSON.parse(message))
	}

	var on_packet = function(name, packet)
	{
		for (var func in packet)
		{
			var args = packet[func];
			server_functions[func](args);
		}
	}

	ws.on('message', on_message)
}

//function do_nothing() {}

module.exports = ws;