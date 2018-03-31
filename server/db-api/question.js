import Debug from 'debug';
import { Question, Answer } from '../models';

const debug = new Debug('platzi-overflow:db-api:questions');

export default {
  findAll: () => {
    debug('Finding all questions');
    return Question.find().populate('answers');
  },
  findById: (id) => {
    debug(`Finding question with id ${id}`);
    return Question.findById(id)
      .populate({
        path: 'user',
        select: '-password',
      })
      .populate({
        path: 'answers',
        options: { sort: '-createdAt' },
        populate: {
          path: 'user',
          select: '-password',
        },
      });
  },
  create: (q) => {
    debug(`Creating new question ${q}`);
    return Question.create(q);
  },
  createAnswer: async (q, a) => {
    const answer = await Answer.create(a);
    q.answers.push(answer);
    await q.save();
    return answer;
  },
};
