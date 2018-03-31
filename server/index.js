import mongoose from 'mongoose';
import Debug from 'debug';
import app from './app';
import { mongoUrl } from './config';

const PORT = 3000;
const debug = new Debug('platzi-overflow:root');

const start = async () => {
  mongoose.set('debug', true);
  await mongoose.connect(mongoUrl);

  app.listen(PORT, () => {
    debug(`Server running on port ${PORT}`);
  });
};

start();
