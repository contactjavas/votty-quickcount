import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

import { Storage } from "@ionic/storage";

import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

import { Response } from "../../interfaces/http";
import { LoginData, User } from "../../interfaces/user";

import { AppService } from "../app/app.service";

import { Menu } from '../../classes/menu/menu';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  menus = [];
  loggedInState = new Subject<any>();

  constructor(
    private storage: Storage,
    private router: Router,
    private http: HttpClient,
    private appService: AppService,
    private menu: Menu
  ) {
  }

  login(data: LoginData): Observable<Response> {
    return this.http
      .post<Response>(
        this.appService.jwtAuthUrl + "/token",
        data,
        this.appService.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  logout() {
    this.storage.remove("token");
    this.storage.remove("user");

    this.storage.remove("calegs");
    this.storage.remove("kelurahans");

    this.menus = this.menu.notLoggedIn;
    this.setLoggedInState(false);
    this.router.navigateByUrl("/login");
  }

  getLoggedInState() {
    return this.loggedInState.asObservable();
  }

  setLoggedInState(value: Boolean) {
    this.loggedInState.next(value);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.message}`
      );
    }
    // return an observable with a user-facing error message
    return throwError(error.error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
}
