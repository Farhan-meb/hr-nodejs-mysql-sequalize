const jwt = require('jsonwebtoken');

const generateAccessToken = (id) => {
	return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '426h',
	});
};

module.exports = {
	generateAccessToken
}