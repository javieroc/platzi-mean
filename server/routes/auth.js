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

const createToken = user => jwt.sign(
  { user },
  secret,
  { expiresIn: 86400 }// 1 day
);

const handleLoginFailed = (res, message) => {
  return res.status(401).json({
    message: 'Login failed',
    error: message || 'Email and password don\'t match',
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
    return handleLoginFailed(res, 'El correo y la contraseña no coinciden.');
  }

  const token = createToken(user);

  res.status(200).json({
    message: 'Login succeded',
    token,
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });
});

app.post('/signup', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  const user = {
    _id: +new Date(),
    firstName,
    lastName,
    email,
    password,
  };

  users.push(user);
  const token = createToken(user);

  res.status(201).json({
    message: 'User saved',
    token,
    userId: user._id,
    firstName,
    lastName,
    email,
  });
});

export default app;
