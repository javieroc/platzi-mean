import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionListComponent } from './question/question-list.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';

import { QuestionRoutes } from './question/question.routing';

const routes: Routes = [
  { path: '', redirectTo: '/questions', pathMatch: 'full' },
  { path: 'questions', children: QuestionRoutes },
  { path: 'signin', component: SigninScreenComponent },
  { path: 'signup', component: SignupScreenComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
