import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

const authAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: 'Access forbidden: Admin only.' });
    }

    req.admin = admin; // Add admin info to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

export default authAdmin;
