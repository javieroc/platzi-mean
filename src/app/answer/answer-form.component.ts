import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Answer } from './answer.model';
import { User } from '../auth/user.model';
import { Question } from '../question/question.model';
import { QuestionService } from '../question/question.service';
import SweetScroll from 'sweet-scroll';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css'],
  providers: [QuestionService],
})
export class AnswerFormComponent {
  @Input() question: Question;
  sweetScroll: SweetScroll;

  constructor(private questionService: QuestionService) {
    this.sweetScroll = new SweetScroll();
  }

  onSubmit(form: NgForm) {
    const answer = new Answer(
      form.value.description,
      this.question,
    );
    this.questionService
      .addAnswer(answer)
      .subscribe(
        a => {
          this.question.answers.unshift(a);
          this.sweetScroll.to('#title');
        },
        error => console.log(error)
      );
    form.reset();
  }
}
