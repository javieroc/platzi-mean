import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QuestionListComponent } from './question/question-list.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { SignupScreenComponent } from './auth/signup-screen.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: QuestionListComponent },
  { path: 'signin', component: SigninScreenComponent },
  { path: 'signup', component: SignupScreenComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
