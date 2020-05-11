import * as LocationActions from "./location.actions";
import { ICountryInfo } from "src/app/interface/interface";

export interface State {
  countries: ICountryInfo[];
  error: string;
  isLoading: boolean;
}

const initialState: State = {
  countries: [],
  error: null,
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
        countries: action.payload.Countries,
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
