import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { CovidInfo, CountryInfo } from "./home/home.model";
import { URL_SUMMARY } from "./utility/constants";

@Injectable({ providedIn: "root" })
export class HttpClass {
  constructor(private http: HttpClient) {}

  getTotalData(text: string) {
    return this.http
      .get<{ Global: CovidInfo; Countries: CountryInfo[] }>(URL_SUMMARY)
      .pipe(
        map((data) => ({
          global: data.Global,
          countries: data.Countries.sort((a, b) => (a[text] < b[text] ? 1 : -1))
            .slice(0, 20)
            .reverse(),
        }))
      );
  }

  getAllCountries() {
    return this.http.get<any>("https://api.covid19api.com/countries");
  }

  getDataForCountry(slug) {
    return this.http.get<any>(
      `https://api.covid19api.com/dayone/country/${slug}`
    );
  }
}
