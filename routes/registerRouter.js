const router = require('express').Router();
const { render, components } = require('../views/views.js');
const checkAuth = require('../middlewares/check-auth.js');
const userModel = require('../models/user.js');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');
const promisify = require('util').promisify;
const signToken = promisify(jwt.sign);
const { jwtSecret, authCookieName } = config;

router.get('/register', checkAuth(false), (req, res, next) => {
  res.send(render({ component: components.register }));
});

router.post('/register', checkAuth(false), async (req, res, next) => {
  let { username, password, rePassword, amount } = req.body;

  const onValidationFail = (error) => {
    res.send(render({ component: components.register, error, data: req.body }));
  };

  if (!username) {
    return onValidationFail('Please enter your username');
  }

  if (!username.match(/^[0-9a-zA-Z]{4,}$/)) {
    return onValidationFail('Username should be at least 4 characters and consist only english letters and digits');
  }

  if (!password || password.length < 4) {
    return onValidationFail('Password should be at least 4 characters long');
  }

  if (password !== rePassword) {
    return onValidationFail("Passwords don't match!");
  }

  if (!amount) {
    amount = 0;
  }

  const number = parseFloat(amount);
  if (isNaN(number) || number < 0) {
    return onValidationFail('Account amount should be positive number');
  }

  const user = await userModel.findOne({ username });
  if (user) {
    return onValidationFail('User already exists!');
  }

  userModel
    .create({ username, password, amount: parseFloat(amount) })
    .then(async (doc) => {
      const jwtToken = await signToken({ userId: doc._id }, jwtSecret);
      res.cookie(authCookieName, jwtToken, { httpOnly: true });
      res.redirect('/');
    })
    .catch(next);
});

module.exports = router;
