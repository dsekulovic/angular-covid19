import { Action } from "@ngrx/store";
import { ICountryInfo, ICovidInfo } from "src/app/interface/interface";

export const GLOBAL_FETCH = "[Global] Fetch";
export const GLOBAL_LOADING = "[Global] Loading";
export const GLOBAL_ERROR = "[Global] Error";

export class GlobalLoading implements Action {
  readonly type = GLOBAL_LOADING;
}

export class GlobalFetch implements Action {
  readonly type = GLOBAL_FETCH;

  constructor(
    public payload: { Global: ICovidInfo; Countries: ICountryInfo[] }
  ) {}
}

export class GlobalError implements Action {
  readonly type = GLOBAL_ERROR;

  constructor(public payload: { error: string }) {}
}

export type GlobalActions = GlobalFetch | GlobalLoading | GlobalError;
