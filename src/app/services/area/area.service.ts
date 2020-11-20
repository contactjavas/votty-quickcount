import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";

import { Storage } from "@ionic/storage";

import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { Response } from "../../interfaces/http";
import { AppService } from "../app/app.service";

@Injectable({
  providedIn: "root"
})
export class AreaService {
  constructor(
    private http: HttpClient,
    private appService: AppService
  ) {
  }

  getCalegs(token: String): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .get<Response>(
        this.appService.apiUrl + "/calegs",
        this.appService.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getKecamatansByKabupaten(token: String, kabupatenId: Number): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .get<Response>(
        this.appService.apiUrl + "/kecamatans/by-kabupaten/" + kabupatenId,
        this.appService.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getKelurahansByKecamatan(token: String, kecamatanId: Number): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .get<Response>(
        this.appService.apiUrl + "/kelurahans/by-kecamatan/" + kecamatanId,
        this.appService.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  createTps(token: String, data: any): Observable<Response> {
    this.appService.httpOptions.headers = this.appService.httpOptions.headers.set(
      "Authorization",
      "Bearer " + token
    );

    return this.http
      .post<Response>(
        this.appService.apiUrl + "/tps/add",
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
