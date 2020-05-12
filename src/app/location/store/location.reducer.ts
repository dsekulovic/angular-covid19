import * as LocationActions from "./location.actions";
import { ICountryInfo } from "src/app/interface/interface";

export interface State {
  country: [];
  countries: ICountryInfo[];
  error: string;
  name: string;
  temp: number;
  isLoading: boolean;
}

const initialState: State = {
  country: [],
  countries: [],
  error: null,
  name: "",
  temp: null,
  isLoading: false,
};

export function locationReducer(
  state = initialState,
  action: LocationActions.LocationActions
) {
  switch (action.type) {
    case LocationActions.LOCATION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LocationActions.LOCATION_FETCH:
      return {
        ...state,
        country: action.payload.country,
        isLoading: false,
      };
    case LocationActions.GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload.countriesList,
        isLoading: false,
      };
    case LocationActions.WEATHER_DATA:
      return {
        ...state,
        name: action.payload.name,
        temp: action.payload.temp,
        isLoading: false,
      };
    case LocationActions.LOCATION_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
