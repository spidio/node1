var path = require('path');

function index(app)
{
	app.get('/', get)
}

function get(req, res)
{
	res.sendFile(path.resolve('views/index.html'));
}

module.exports = index;