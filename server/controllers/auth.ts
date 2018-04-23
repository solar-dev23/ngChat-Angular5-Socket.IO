import * as passport from "passport";
import User from "../models/User";
import * as jwt from 'jsonwebtoken';
import config from "../config/config.dev";

export const login = (req, res, next) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("password", "Password cannot be blank").notEmpty();
  
  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({success: false, message: 'Invalid request.', result: null});
  }

  passport.authenticate("local", (err, user, info) => {
    if (err)
      return res.status(400).send({success: false, message: 'User authentication error.', result: null});

    if (!user) {
      return res.status(400).send({success: false, message: info.message, result: null});
    }

    req.logIn(user, (err) => {
      if (err) 
        return res.status(400).send({success: false, message: 'Invalid request.', result: null});

      const token = getToken(user);
      return res.send({success: true, message: 'Successfully logged in.', result: { user: user.toObject(), token }});
    });

  })(req, res, next);

};

export const register = (req, res, next) => {
  req.assert("email", "Email is not valid").isEmail();
  req.assert("username", "Username must be at least 4 characters long").len(4);
  req.assert("password", "Password must be at least 6 characters long").len(6);
  req.assert("confirmPassword", "Passwords do not match").equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({success: false, message: 'Invalid request.', result: null});
  }

  const user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) 
      return res.status(400).send({success: false, message: 'User not found.', result: null});

    if (existingUser) {
      return res.status(400).send({success: false, message: 'User already exists.', result: null});
    }

    user.save((err, newUser) => {
      if (err)
        return res.status(400).send({success: false, message: 'User create error.', result: null});

      const token = getToken(user);
      return res.send({success: true, message: 'User has been successfully created.', result: { user: user.toObject(), token }});
    });
  });  
}

export const validate = (req, res) => {
  res.send({
    user: req.user.toObject(),
  });
}

function getToken(user) {
  return jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: 86400, // expires in 24 hours
  });
}

export module AuthController{};

