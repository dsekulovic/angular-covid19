import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClass } from "../http.service";
import { ICountryInfo } from "../interface/interface";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Label } from "ng2-charts";
import { ChartType, ChartDataSets } from "chart.js";
import { chartDataLoader, initializeLabels } from "../utility/helper";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import { map } from "rxjs/operators";
import * as LocationActions from "./store/location.actions";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
})
export class LocationComponent implements OnInit, OnDestroy {
  countries: ICountryInfo[];
  mainData: ICountryInfo[];
  latitude: number;
  longitude: number;
  isLoading: boolean = true;
  error = null;
  labels = ["Confirmed", "Recovered", "Deaths"];
  period = [0, 7, 15, 30];
  weather = { temp: null, name: "" };
  name: string;
  temp: number;
  searchText: string;
  subs: Subscription[] = [];
  activeCountry: string;
  totalData: {};

  text: string;
  activeSort: number;
  routeSubscription$: Subscription;

  lineChartLabels: Label[] = [];
  lineChartType: ChartType = "line";
  lineChartData: ChartDataSets[] = [];
  lineChartColors = [
    {
      backgroundColor: "rgba(240, 52, 52, 0.8)",
    },
    {
      backgroundColor: "rgba(0,255,0,0.8)",
    },
    {
      backgroundColor: "rgba(0,0,0,0.8)",
    },
  ];

  constructor(
    private http: HttpClass,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.lineChartData = initializeLabels(this.labels);
    this.store.select("global").subscribe((data) => {
      if (data.countries.length) {
        this.countries = [
          ...data.countries,
        ].sort((a: ICountryInfo, b: ICountryInfo) =>
          a.Country > b.Country ? 1 : -1
        );
      } else {
        this.store.dispatch(new LocationActions.FetchCountries());
      }
    });

    this.subs.push(
      this.route.params.subscribe((params) => this.dataForCountry(params["id"]))
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  onSelectCountry(data: string) {
    this.searchText = "";
    this.dataForCountry(data);
  }

  dataForCountry(data: string) {
    this.activeCountry = data;
    this.store.dispatch(new LocationActions.LocationLoading({ slug: data }));
    this.store.select("location").subscribe(
      (data) => {
        this.mainData = data.country;

        if (this.mainData.length) {
          this.loadChartData(0);
          const lastElement = this.mainData[this.mainData.length - 1];
          const {
            Confirmed: TotalConfirmed,
            Recovered: TotalRecovered,
            Deaths: TotalDeaths,
          } = lastElement;

          this.totalData = {
            TotalConfirmed,
            TotalRecovered,
            TotalDeaths,
          };

          this.name = data.name;
          this.temp = data.temp;

          // this.latitude = +this.mainData[0].Lat;
          // this.longitude = +this.mainData[0].Lon;

          // this.store.dispatch(
          //   new LocationActions.GetWeather({
          //     lat: this.latitude,
          //     lon: this.longitude,
          //   })
          // );

          // this.subs.push(
          //   this.http.getWeather(this.latitude, this.longitude).subscribe(
          //     (data) => (
          //       (this.weather = {
          //         ...this.weather,
          //         temp: Math.round(data.temp),
          //         name: data.name,
          //       }),
          //       (this.isLoading = false)
          //     )
          //   )
          // );
          this.error = null;
        } else {
          this.error = "There are no data for this country!";
          this.isLoading = false;
        }
      },
      (error) => {
        this.error = "This country is not found!";
        this.isLoading = false;
      }
    );
  }

  onLoadChartData(type: number) {
    this.loadChartData(type);
  }

  loadChartData(type: number) {
    this.activeSort = type;
    let filteredData = [];

    filteredData = this.mainData.slice(0 - this.activeSort);
    this.text = `Covid-19 in ${this.mainData[0].Country}`;

    this.lineChartData = chartDataLoader(this.lineChartData, filteredData);

    this.lineChartLabels = filteredData.map((el) => el.Date);
  }
}
