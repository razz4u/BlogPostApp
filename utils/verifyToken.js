const jwt = require('jsonwebtoken');
const  User = require('../models/User');

const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error('Authentication required');
    }
    const tokenWithoutQuotes = token.slice(1, -1);
    const token2 = jwt.sign({ id: 10 }, "mySecret", {
        expiresIn: "1h"
    });
    let decodedToken
    try {
        decodedToken =  jwt.verify(tokenWithoutQuotes, "mySecret");
    } catch (error) {
        console.log(`Error decode: ${error}`);
    }

    const user = await User.findByPk(decodedToken.id);

    if (!user) {
      throw new Error('Invalid token');
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = verifyToken;
