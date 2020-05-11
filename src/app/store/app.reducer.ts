import { ActionReducerMap } from "@ngrx/store";

import * as fromGlobalData from "../home/store/global.reducer";
import * as fromLocationData from "../location/store/location.reducer";

export interface AppState {
  global: fromGlobalData.State;
  location: fromLocationData.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  global: fromGlobalData.globalReducer,
  location: fromLocationData.locationReducer,
};
