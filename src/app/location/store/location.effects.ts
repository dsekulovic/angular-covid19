import { Actions, ofType, Effect } from "@ngrx/effects";
import * as LocationActions from "./location.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class LocationEffects {
  @Effect()
  getLocationData$ = this.actions$.pipe(
    ofType(LocationActions.LOCATION_LOADING),
    switchMap((data) => {
      console.log(data.payload.slug);

      return this.http
        .get<any>(
          `https://api.covid19api.com/dayone/country/${data.payload.slug}`
        )
        .pipe(
          map((data) => {
            return new LocationActions.LocationFetch({
              Countries: data.reduce(
                (acc, el) => [
                  ...acc,
                  { ...el, Date: new Date(el.Date).toLocaleDateString() },
                ],
                []
              ),
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
