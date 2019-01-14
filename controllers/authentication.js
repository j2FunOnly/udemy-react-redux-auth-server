const User = require('../models/user');

exports.signup = (req, res, next) => {
  const { email, password } = req.body;

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

      res.json(newUser);
    });
  });
}
