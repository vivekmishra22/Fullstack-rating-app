module.exports = (req, res, next) => {
  if (req.user.role !== 'store_owner') {
    return res.status(403).json({ message: 'Access denied. Store owner privileges required.' });
  }
  next();
};