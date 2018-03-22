import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import urljoin from 'url-join';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  userUrl: string;
  currentUser: User;
  
  constructor(
    private http: Http,
    private router: Router
  ) {
    this.userUrl = urljoin(environment.apiUrl, 'auth');
    if (this.isLoggedIn()) {
      const { userId, email, firstName, lastName } = JSON.parse(localStorage.getItem('user'));
      this.currentUser = new User(
        email,
        null,
        firstName,
        lastName,
        userId
      );
    }
  }

  signin(user: User) {
    const body = JSON.stringify(user);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(urljoin(this.userUrl, 'signin'), body, { headers })
      .map((response: Response) => {
        const json = response.json();
        console.log('server data', json);
        this.login(json);
        return json;
      })
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw(error.json());
      });
  }

  login = ({ token, userId, firstName, lastName, email }) => {
    this.currentUser = new User(
      email,
      null,
      firstName,
      lastName,
      userId
    );
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({
      userId,
      email,
      firstName,
      lastName,
    }));
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.clear();
    this.currentUser = null;
    this.router.navigateByUrl('/');
  }
}
