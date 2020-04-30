export interface ICovidInfo {
  TotalDeaths: number;
  TotalRecovered: number;
  TotalConfirmed: number;
  NewDeaths?: number;
  NewRecovered?: number;
  NewConfirmed?: number;
}

export interface ICountryInfo {
  Country: string;
  Date: Date;
  TotalDeaths?: number;
  TotalRecovered?: number;
  TotalConfirmed?: number;
  Deaths?: number;
  Recovered?: number;
  Confirmed?: number;
  Lat?: string;
  Lon?: string;
}
