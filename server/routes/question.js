import express from 'express';
import {
  required,
  questionMiddleware,
  questionsMiddleware,
} from '../middleware';

const app = express.Router();

app.get('/', questionsMiddleware, (req, res) => res.status(200).json(req.questions));

app.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question);
});

app.post('/', required, (req, res) => {
  const question = req.body;
  question._id = +new Date();
  question.user = req.user;
  question.answers = [];
  questions.push(question);
  res.status(200).json(question);
});

app.post('/:id/answers', required, questionMiddleware, (req, res) => {
  const answer = req.body;
  answer.createdAt = new Date();
  answer.user = req.user;
  const q = req.question;
  q.answers.push(answer);

  res.status(201).json(answer);
});

export default app;
