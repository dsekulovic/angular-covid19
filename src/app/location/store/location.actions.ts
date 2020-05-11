import { Action } from "@ngrx/store";
import { ICountryInfo } from "src/app/interface/interface";

export const LOCATION_FETCH = "[Location] Fetch";
export const LOCATION_LOADING = "[Location] Loading";
export const LOCATION_ERROR = "[Location] Error";

export class LocationLoading implements Action {
  readonly type = LOCATION_LOADING;
  constructor(public payload: { slug: string }) {}
}

export class LocationFetch implements Action {
  readonly type = LOCATION_FETCH;

  constructor(public payload: { Countries: ICountryInfo[] }) {}
}

export class LocationError implements Action {
  readonly type = LOCATION_ERROR;

  constructor(public payload: { error: string }) {}
}

export type LocationActions = LocationFetch | LocationLoading | LocationError;
