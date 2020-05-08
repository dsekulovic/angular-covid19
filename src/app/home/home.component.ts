import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClass } from "../http.service";
import { ICovidInfo, ICountryInfo } from "../interface/interface";
import { Subscription } from "rxjs";
import { Label } from "ng2-charts";
import { ChartType, ChartDataSets } from "chart.js";
import {
  initializeLabels,
  joinString,
  chartDataLoader,
} from "../utility/helper";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
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

  constructor(private http: HttpClass) {}

  ngOnInit(): void {
    this.fetchingData();
    this.lineChartData = initializeLabels(this.totalLabels);
  }

  ngOnDestroy() {
    this.dataSubscription$.unsubscribe();
  }

  fetchingData() {
    this.isLoading = true;
    this.dataSubscription$ = this.http.getTotalData().subscribe(
      ({ countries, global }) => {
        this.isLoading = false;
        this.chartData = countries;

        this.data = global;
        this.loadChartData(joinString(this.totalLabels[0]));
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }

  onLoadChartData(type: string) {
    this.loadChartData(type);
  }

  loadChartData(type: string) {
    this.activeSort = joinString(type);

    this.tableData = this.chartData
      .sort((a: ICountryInfo, b: ICountryInfo) =>
        a[this.activeSort] < b[this.activeSort] ? 1 : -1
      )
      .slice(0, this.numberOfData);

    this.lineChartData = chartDataLoader(this.lineChartData, this.tableData);
    this.lineChartLabels = this.tableData.map((el) => el.Country);

    this.text = `${this.numberOfData} countries with most ${this.activeSort} cases`;
  }
}
