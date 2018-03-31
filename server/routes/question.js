import express from 'express';
import { required } from '../middleware';
import { question } from '../db-api';
import { handleError } from '../utils';
import { User } from '../models';

const app = express.Router();

app.get('/', async (req, res) => {
  try {
    const questions = await question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    handleError(error, res);
  }
});

app.get('/:id', async (req, res) => {
  try {
    const q = await question.findById(req.params.id)
    res.status(200).json(q);
  } catch (error) {
    handleError(error, res);
  }
});

app.post('/', required, async (req, res) => {
  try {
    const { title, description, icon } = req.body;
    const q = await question.create({
      title,
      description,
      icon,
      user: req.user._id,
    });
    res.status(200).json(q);
  } catch (error) {
    handleError(error, res);
  }
});

app.post('/:id/answers', required, async (req, res) => {
  try {
    const q = await question.findById(req.params.id);
    const a = req.body;
    a.user = new User(req.user);
    const answer = await question.createAnswer(q, a);
    res.status(201).json(answer);
  } catch (error) {
    handleError(error, res);
  }
});

export default app;
