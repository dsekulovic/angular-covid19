import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class HttpClass {
  constructor(private http: HttpClient) {}

  getTotalData() {
    return this.http.get<any>("https://api.covid19api.com/summary").pipe(
      map((data) => {
        return {
          global: data.Global,
          countries: data.Countries,
        };
      })
    );
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getAllCountries() {
    return this.http.get<any>("https://api.covid19api.com/countries");
  }

  getDataForCountry(slug) {
    return this.http.get<any>(
      `https://api.covid19api.com/dayone/country/${slug}`
    );
  }

  getDataForCountryFromTo() {
    return this.http
      .get<any>(
        "https://api.covid19api.com/country/south-africa?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z"
      )
      .pipe(
        map((data) => {
          return {
            global: data.Global,
            countries: data.Countries,
          };
        })
      );
  }

  getWeatherData(url: string) {
    return this.http.get<any>(url).pipe(
      map((data) => {
        return {
          temp: data.main.temp,
          weather: data.weather[0].main,
          humidity: data.main.humidity,
          wind: data.wind.speed,
          name: data.name,
        };
      })
    );
  }
}
