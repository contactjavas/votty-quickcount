import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Response } from "../../interfaces/http";
import { AppService } from "../app/app.service";

@Injectable({
  providedIn: "root"
})
export class TpsService {
  constructor(
    private http: HttpClient,
    private appService: AppService
  ) {
  }

  fetchTps(token: String, userId: number): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .get<Response>(
        this.appService.apiUrl + "/my-tps/" + userId,
        this.appService.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  get(token: String, tpsId: Number): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .get<Response>(
        this.appService.apiUrl + "/tps/" + tpsId,
        this.appService.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  submitVotes(token: String, data: any): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .post<Response>(
        this.appService.apiUrl + "/submit-votes",
        data,
        this.appService.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
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
