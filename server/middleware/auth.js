import Debug from 'debug';
import jwt from 'jsonwebtoken';
import { secret } from '../config';

const debug = new Debug('platzi-overflow:auth');

export const required = (req, res, next) => {
  jwt.verify(req.query.token, secret, (err, token) => {
    if (err) {
      debug('JWT was not encrypted with our secret key');
      return res.status(401).json({
        message: 'Unauthorized',
        error: err,
      });
    }

    debug(`Token verified ${token}`);
    req.user = token.user;
    next();
  });
};
