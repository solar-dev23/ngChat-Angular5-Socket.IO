import User from '../models/User';

const attachUserMiddleware = (req, res, next) => {
  User.findById(req.user.id, (err, user) => {
    req.user = user;

    next();
  });
};

export default attachUserMiddleware;
