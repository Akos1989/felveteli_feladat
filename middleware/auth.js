import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export default async function protect(req, res, next) {
  
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    if (!token) {
      return res.status(401).json({ message: "You are not logged in! " });
    }
    
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  
    
    const currentUser = await User.findById(decoded.user_id);
    if (!currentUser) {
      return res.status(401).json({ message: "email does not exist" });
    }
    
    req.user = currentUser;
    next();
  }