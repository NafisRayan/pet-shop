const { User } = require('../services/mongodb');

module.exports = async function(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied. Admin only.' });
    }
    
    next();
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
