import * as GlobalActions from "./global.actions";

import { ICovidInfo, ICountryInfo } from "src/app/interface/interface";

export interface State {
  globalData: ICovidInfo;
  countries: ICountryInfo[];
  error: string;
  isLoading: boolean;
}

const initialState: State = {
  globalData: {
    TotalConfirmed: 0,
    TotalRecovered: 0,
    TotalDeaths: 0,
  },
  countries: [],
  error: null,
  isLoading: false,
};

export function globalReducer(
  state = initialState,
  action: GlobalActions.GlobalActions
) {
  switch (action.type) {
    case GlobalActions.GLOBAL_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GlobalActions.GLOBAL_FETCH:
      return {
        ...state,
        globalData: action.payload.Global,
        countries: action.payload.Countries,
        isLoading: false,
      };
    case GlobalActions.GLOBAL_ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
