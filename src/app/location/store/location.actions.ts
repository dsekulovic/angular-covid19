import { Action } from "@ngrx/store";
import { ICountryInfo } from "src/app/interface/interface";

export const LOCATION_FETCH = "[Location] Fetch";
export const LOCATION_LOADING = "[Location] Loading";
export const FETCH_COUNTRIES = "[Location] FetchCountries";
export const GET_COUNTRIES = "[Location] GetCountries";
export const LOCATION_ERROR = "[Location] Error";
export const GET_WEATHER = "[Location] GetWeather";
export const WEATHER_DATA = "[Location] WeatherData";

export class LocationLoading implements Action {
  readonly type = LOCATION_LOADING;
  constructor(public payload: { slug: string }) {}
}

export class LocationFetch implements Action {
  readonly type = LOCATION_FETCH;

  constructor(public payload: { country: [] }) {}
}

export class FetchCountries implements Action {
  readonly type = FETCH_COUNTRIES;
}

export class GetCountries implements Action {
  readonly type = GET_COUNTRIES;

  constructor(public payload: { countriesList: [] }) {}
}

export class LocationError implements Action {
  readonly type = LOCATION_ERROR;

  constructor(public payload: { error: string }) {}
}

export class GetWeather implements Action {
  readonly type = GET_WEATHER;

  constructor(
    public payload: {
      lat: number;
      lon: number;
    }
  ) {}
}

export class WeatherData implements Action {
  readonly type = WEATHER_DATA;

  constructor(
    public payload: {
      name: string;
      temp: number;
    }
  ) {}
}

export type LocationActions =
  | LocationFetch
  | LocationLoading
  | FetchCountries
  | GetCountries
  | LocationError
  | GetWeather
  | WeatherData;
