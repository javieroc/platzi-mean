import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs/Observable';
import urljoin from 'url-join';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  userUrl: string;
  currentUser: User;
  
  constructor(
    private http: Http,
    private router: Router,
    public snackBar: MatSnackBar
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
        this.login(json);
        return json;
      })
      .catch((error: Response) => {
        console.log(error);
        return Observable.throw(error.json());
      });
  }

  signup(user: User) {
    const body = JSON.stringify(user);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(urljoin(this.userUrl, 'signup'), body, { headers })
      .map((response: Response) => {
        const json = response.json();
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
    this.router.navigateByUrl('/signin');
  }

  showError(message: any) {
    this.snackBar.open(message, 'x', { duration: 2500 });
  }

  public handleError = (error: any) => {
    const { error: {name}, message } = error;
    if (name === 'TokenExpiredError') {
      this.showError('Tu sesión ha expirado');
    } else if (name === 'JsonWebTokenError') {
      this.showError('Ha habido un problema con tu sesión');
    } else {
      this.showError(message || 'Ha ocurrido un error, intentalo nuevamente');
    }
    this.logout();
  }
}
