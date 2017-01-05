var game;
var socket;
var isLocal = false;

function main()
{
	game = new Game();
	socket = io.connect(isLocal ? 'http://localhost:8000' : 'http://nodee.herokuapp.com');
	game.init();
}