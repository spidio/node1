const util = require('util');
var current = "";

var show_date = false;

function DATE(message)
{
	var message = message === undefined ? "" : message;
	var datetime = new Date();
	current += "[" + datetime.getUTCHours() + ":" + datetime.getUTCMinutes() + ":" + datetime.getUTCSeconds() + "] " + message;
	return module.exports;
}

function date(message)
{var datetime = new Date();
	DATE(message);
	log();
}

function showDate()
{
	show_date = true;
}

function INFO(message)
{
	var message = message === undefined ? "" : message;
	current += "[INFO] " + message;
	return module.exports;
}

function info(message)
{
	INFO(message);
	log();
}

function inspect(obj, message)
{
	var message = message === undefiend ? "" : message;
	current += "[INSPECT] " + message;
	log()
	util.inspect(obj);
} 

function log()
{
	var before = "";
	if (show_date)
		var datetime = new Date();
		before += "[" + datetime.getUTCHours() + ":" + datetime.getUTCMinutes() + ":" + datetime.getUTCSeconds() + "] ";
	console.log(before + current);
	current = "";
}

module.exports.DATE = DATE;
module.exports.date = date;
module.exports.showDate = showDate;
module.exports.INFO = INFO;
module.exports.info = info;