import express from 'express';

const app = express.Router();

const currentUser = {
  firstName: 'Javier',
  lastName: 'Ocampo',
  email: 'admin@gmail.com',
  password: 'admin',
}

const question = {
  _id: 1,
  title: '¿Cómo reutilizo un componente en Android?',
  description: 'Miren esta es mi pregunta',
  createdAt: new Date(),
  icon: 'devicon-android-plain',
  answers: [],
  user: {
    firstName: 'Javier',
    lastName: 'Ocampo',
    email: 'admin@gmail.com',
    password: 'admin',
  },
};

const questionMiddleware = (req, res, next) => {
  const { id } = req.params;
  req.question = questions.find(({ _id }) => _id === +id);
  next();
};

const userMiddleware = (req, res, next) => {
  req.user = currentUser;
  next();
};

const questions = new Array(10).fill(question);

app.get('/', (req, res) => res.status(200).json(questions));

app.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question);
});

app.post('/', userMiddleware, (req, res) => {
  const question = req.body;
  question._id = +new Date();
  question.user = req.user;
  question.answers = [];
  questions.push(question);
  res.status(200).json(question);
});

app.post('/:id/answers', userMiddleware, questionMiddleware, (req, res) => {
  const answer = req.body;
  answer.createdAt = new Date();
  answer.user = req.user;
  const q = req.question;
  q.answers.push(answer);

  res.status(201).json(answer);
});

export default app;
