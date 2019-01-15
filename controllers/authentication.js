const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
  const options = {
    sub: user.id,
    iat: new Date().getTime()
  };

  return jwt.encode(options, config.secret);
}

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422)
      .send({
        error: 'Email and password must be provided.'
      });
  }

  User.findOne({ email }, (err, user) => {
    if (err) { return next(err); }

    if (user) {
      return res.status(422).send({error: 'Email is in use.'});
    }

    const newUser = new User({
      email,
      password
    });

    newUser.save(err => {
      if (err) return next(err);

      res.json({ token: tokenForUser(newUser) });
    });
  });
}
