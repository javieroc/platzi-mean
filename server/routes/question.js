import express from 'express';

const app = express.Router();

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

const questions = new Array(10).fill(question);

app.get('/', (req, res) => res.status(200).json(questions));

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const q = questions.find(({ _id }) => _id === +id);
  res.status(200).json(q);
});

app.post('/', (req, res) => {
  const question = req.body;
  question._id = +new Date();
  question.user = {
    email: 'test@gmail.com',
    password: '12345',
    firstName: 'test',
    lastName: 'test',
  };
  question.answers = [];
  questions.push(question);
  res.status(200).json(question);
});

export default app;
