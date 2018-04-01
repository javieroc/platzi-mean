import mongoose from 'mongoose';
import Debug from 'debug';
import app from './app';
import { mongoUrl, port } from './config';

const debug = new Debug('platzi-overflow:root');

const start = async () => {
  mongoose.set('debug', true);
  await mongoose.connect(mongoUrl);

  app.listen(port, () => {
    debug(`Server running on port ${port}`);
  });
};

start();
