import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { ICovidInfo, ICountryInfo } from "./interface/interface";
import { URL_SUMMARY } from "./utility/constants";

@Injectable({ providedIn: "root" })
export class HttpClass {
  constructor(private http: HttpClient) {}

  getTotalData() {
    return this.http
      .get<{ Global: ICovidInfo; Countries: ICountryInfo[] }>(URL_SUMMARY)
      .pipe(
        map((data) => ({
          global: data.Global,
          countries: data.Countries,
        }))
      );
  }

  getAllCountries() {
    return this.http.get<any>("https://api.covid19api.com/countries");
  }

  getDataForCountry(slug: string) {
    return this.http
      .get<any>(`https://api.covid19api.com/dayone/country/${slug}`)
      .pipe(
        map((data) =>
          data.reduce(
            (acc, el) => [
              ...acc,
              { ...el, Date: new Date(el.Date).toLocaleDateString() },
            ],
            []
          )
        )
      );
  }

  getWeather(lat: number, lon: number) {
    return this.http
      .get<any>(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c3b8f2e28ea9bf6f5d8bcb678001ab74`
      )
      .pipe(
        map((data) => {
          return {
            temp: data.main.temp,
            name: data.name,
          };
        })
      );
  }
}
