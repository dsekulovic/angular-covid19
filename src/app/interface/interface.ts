export interface CovidInfo {
  TotalDeaths: number;
  TotalRecovered: number;
  TotalConfirmed: number;
  NewDeaths?: number;
  NewRecovered?: number;
  NewConfirmed?: number;
}

export interface CountryInfo {
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
