import { Component, OnInit } from "@angular/core";
import { ICovidInfo, ICountryInfo } from "../interface/interface";
import { Subscription } from "rxjs";
import { Label } from "ng2-charts";
import { ChartType, ChartDataSets } from "chart.js";
import {
  initializeLabels,
  joinString,
  chartDataLoader,
} from "../utility/helper";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as GlobalActions from "./store/global.actions";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isLoading: boolean;
  data: ICovidInfo;
  chartData: ICountryInfo[];
  tableData: ICountryInfo[];
  error = null;
  totalLabels: string[] = [
    "Total Confirmed",
    "Total Recovered",
    "Total Deaths",
  ];
  dataSubscription$: Subscription;
  numberOfData = 15;

  text: string;
  activeSort: string;

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

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new GlobalActions.GlobalLoading());
    this.lineChartData = initializeLabels(this.totalLabels);
    this.store
      .select("global")
      .subscribe(({ countries, globalData, isLoading, error }) => {
        if (error) {
          this.error = error;
        } else {
          this.isLoading = isLoading;
          this.chartData = countries;
          this.data = globalData;
          this.loadChartData(joinString(this.totalLabels[0]));
        }
      });
  }

  onLoadChartData(type: string) {
    this.loadChartData(type);
  }

  loadChartData(type: string) {
    this.activeSort = joinString(type);

    this.tableData = [...this.chartData]
      .sort((a: ICountryInfo, b: ICountryInfo) =>
        a[this.activeSort] < b[this.activeSort] ? 1 : -1
      )
      .slice(0, this.numberOfData);

    this.lineChartData = chartDataLoader(this.lineChartData, this.tableData);
    this.lineChartLabels = this.tableData.map((el) => el.Country);

    this.text = `${this.numberOfData} countries with most ${this.activeSort} cases`;
  }
}
