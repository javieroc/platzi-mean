import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import urljoin from 'url-join';
import { Question } from './question.model';
import { environment } from '../../environments/environment';

@Injectable()
export class QuestionService {
  private questionsUrl: string;

  constructor(private http: Http) {
    this.questionsUrl = urljoin(environment.apiUrl, 'questions');
  }

  getQuestions(): Promise<void | Question[]> {
    return this.http.get(this.questionsUrl)
      .toPromise()
      .then(response => response.json() as Question[])
      .catch(this.handleError);
  }

  getQuestion(id): Promise<void | Question> {
    const url = urljoin(this.questionsUrl, id);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Question)
      .catch(this.handleError);
  }

  addQuestion(question: Question) {
    const body = JSON.stringify(question);
    const headers = new Headers({ 'Content-Type': 'application/json'});

    return this.http.post(this.questionsUrl, body, { headers })
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  handleError(error: any) {
    const errorMessage = error.message ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.log(errorMessage);
  }
}
