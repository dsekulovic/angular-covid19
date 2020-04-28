import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CovidInfo, CountryInfo } from "./interface/interface";
import { URL_SUMMARY } from "./utility/constants";

@Injectable({ providedIn: "root" })
export class HttpClass {
  constructor(private http: HttpClient) {}

  getTotalData() {
    return this.http
      .get<{ Global: CovidInfo; Countries: CountryInfo[] }>(URL_SUMMARY)
      .pipe(
        map((data) => ({
          global: data.Global,
          countries: data.Countries,
        }))
      );
  }
}
