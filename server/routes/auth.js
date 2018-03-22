import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';

const app = express.Router();
const debug = new Debug('platzi-overflow:auth');

const secret = 'miclavesecreta';

const users = [{
  _id: 1,
  firstName: 'Javier',
  lastName: 'Ocampo',
  email: 'admin@gmail.com',
  password: 'admin',
}];

const findUserByEmail = e => users.find(({ email }) => email === e);

const comparePassword = (password, userPassword) => password === userPassword;

const handleLoginFailed = (res) => {
  return res.status(401).json({
    message: 'Login failed',
    error: 'Email and password don\'t match',
  });
}

app.post('/signin', (req, res, next) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

  if (!user) {
    debug(`User with email ${email} not found`);
    return handleLoginFailed(res);
  }

  if (!comparePassword(password, user.password)) {
    debug(`Passwords do not match ${password} !== ${user.password}`);
    return handleLoginFailed(res);
  }

  const token = jwt.sign(
    { user },
    secret,
    { expiresIn: 86400 }// 1 day
  );

  res.status(200).json({
    message: 'Login succeded',
    token,
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

export default app;
