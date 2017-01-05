function requests(app, io)
{
	require('./index')(app);
	require('./game')(io);
}

module.exports = requests;