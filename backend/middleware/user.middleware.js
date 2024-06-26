const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const HttpError = require("../models/http.error")

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Change 'your_secret_key' to your actual secret key
  
      
      const user = await User.findOne({"uuid": decoded.userId});
  
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
  
      req.user = user;
  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
}

module.exports = requireAuth