import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Answer } from './answer.model';
import { User } from '../auth/user.model';
import { Question } from '../question/question.model';
import { QuestionService } from '../question/question.service';
import { AuthService } from '../auth/auth.service';
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

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private authService: AuthService
  ) {
    this.sweetScroll = new SweetScroll();
  }

  onSubmit(form: NgForm) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }

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
        this.authService.handleError
      );
    form.reset();
  }
}
