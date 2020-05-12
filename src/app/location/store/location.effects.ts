import { Actions, ofType, Effect } from "@ngrx/effects";
import * as LocationActions from "./location.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";

@Injectable()
export class LocationEffects {
  @Effect()
  getLocationData$: Observable<Action> = this.actions$.pipe(
    ofType<LocationActions.LocationLoading>(LocationActions.LOCATION_LOADING),
    switchMap((data) => {
      return this.http
        .get<any>(
          `https://api.covid19api.com/dayone/country/${data.payload.slug}`
        )
        .pipe(
          map((data) => {
            return new LocationActions.LocationFetch({
              country: data.reduce(
                (acc, el) => [
                  ...acc,
                  { ...el, Date: new Date(el.Date).toLocaleDateString() },
                ],
                []
              ),
            });
          }),
          // map((data) => {
          //   const { Lat, Lon } = data.payload.country[0];
          //   return new LocationActions.GetWeather({
          //     lat: +Lat,
          //     lon: +Lon,
          //   });
          // }),
          catchError((error) => {
            return of(
              new LocationActions.LocationError({
                error: error.message,
              })
            );
          })
        );
    })
  );

  @Effect()
  getCountries$: Observable<Action> = this.actions$.pipe(
    ofType<LocationActions.FetchCountries>(LocationActions.FETCH_COUNTRIES),
    switchMap(() => {
      return this.http.get<any>("https://api.covid19api.com/countries").pipe(
        map((data) => {
          return new LocationActions.GetCountries({
            countriesList: data.sort((a, b) =>
              a.Country > b.Country ? 1 : -1
            ),
          });
        })
      );
    })
  );

  @Effect()
  getWeatherData$: Observable<Action> = this.actions$.pipe(
    ofType<LocationActions.GetWeather>(LocationActions.GET_WEATHER),
    switchMap((data) => {
      const { lat, lon } = data.payload;
      console.log(data);

      return this.http
        .get<any>(
          `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=c3b8f2e28ea9bf6f5d8bcb678001ab74`
        )
        .pipe(
          map((data) => {
            return new LocationActions.WeatherData({
              temp: Math.round(data.main.temp),
              name: data.name,
            });
          }),
          catchError((error) => {
            return of(
              new LocationActions.LocationError({
                error: error.message,
              })
            );
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
