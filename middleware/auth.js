const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  //check for the token
  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token found, authorisation denied' });
  }
  //verify token
  try {
    //decode the token and verify
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //assign the user to the decoded token of the user
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
