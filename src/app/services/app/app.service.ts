import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AppService {
  public apiUrl = "https://quickcount.diggy.id/wp-json/rekap-suara/v1";
  public jwtAuthUrl = "https://quickcount.diggy.id/wp-json/jwt-auth/v1";

  public httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: ""
    })
  };

  constructor() { }
}
