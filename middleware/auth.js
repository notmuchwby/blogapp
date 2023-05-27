const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }
  
    try {
      const tokenWithoutBearer = token.split(' ')[1];
      console.log(tokenWithoutBearer)
      const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Invalid Token' });
    }
  };

module.exports = { auth };
