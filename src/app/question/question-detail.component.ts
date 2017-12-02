import { Component } from '@angular/core';
import { Question } from './question.model';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent {
  question: Question = new Question(
    'Nueva pregunta sobre Android',
    'Esta es una descripción de una pregunta sobre Android...',
    new Date,
    'devicon-android-plain'
  );
}
