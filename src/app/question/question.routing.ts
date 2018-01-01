import { Routes } from '@angular/router';
import { QuestionListComponent } from './question-list.component';
import { QuestionFormComponent } from './question-form.component';
import { QuestionDetailComponent } from './question-detail.component';

export const QuestionRoutes: Routes = [
  { path: '', component: QuestionListComponent },
  { path: 'new', component: QuestionFormComponent },
  { path: ':id', component: QuestionDetailComponent },
];
