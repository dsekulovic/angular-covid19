import { Actions, ofType, Effect } from "@ngrx/effects";
import * as GlobalActions from "./global.actions";
import { switchMap, map, catchError } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ICovidInfo, ICountryInfo } from "src/app/interface/interface";
import { URL_SUMMARY } from "src/app/utility/constants";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class GlobalEffects {
  loaded = false;
  @Effect()
  getTotalData$ = this.actions$.pipe(
    ofType(GlobalActions.GLOBAL_LOADING),
    switchMap(() => {
      return this.http
        .get<{ Global: ICovidInfo; Countries: ICountryInfo[] }>(URL_SUMMARY)
        .pipe(
          map((data) => {
            return new GlobalActions.GlobalFetch({
              Global: data.Global,
              Countries: data.Countries,
            });
          }),
          catchError((error) => {
            return of(
              new GlobalActions.GlobalError({
                error: error.message,
              })
            );
          })
        );
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
