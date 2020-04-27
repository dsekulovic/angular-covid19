export class CovidInfo {
  constructor(
    public TotalDeaths: number,
    public TotalRecovered: number,
    public TotalConfirmed: number,
    public NewDeaths: number,
    public NewRecovered: number,
    public NewConfirmed: number
  ) {}
}

export class CountryInfo {
  constructor(
    public Country: string,
    public TotalDeaths: number,
    public TotalRecovered: number,
    public TotalConfirmed: number
  ) {}
}
