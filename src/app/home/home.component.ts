import { Component, OnInit } from "@angular/core";
import { HttpClass } from "../http.service";

import { ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { CovidInfo, CountryInfo } from "./home.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  loading: boolean = false;
  data: CovidInfo;

  // barChart data
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = "bar";
  public lineChartType = "line";

  public barChartData: ChartDataSets[] = [
    { data: [], label: "TotalDeaths" },
    { data: [], label: "TotalRecovered" },
    {
      data: [],
      label: "TotalConfirmed",
    },
  ];
  public barChartColors = [
    {
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    {
      backgroundColor: "rgba(0,255,0,0.8)",
    },
    {
      backgroundColor: "rgba(240, 52, 52, 0.8)",
    },
  ];

  constructor(private http: HttpClass) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchingData("TotalConfirmed");
  }

  changeData(text: string) {
    this.barChartData = [
      { data: [], label: "TotalDeaths" },
      { data: [], label: "TotalRecovered" },
      {
        data: [],
        label: "TotalConfirmed",
      },
    ];
    this.barChartLabels = [];

    this.fetchingData(text);
  }

  fetchingData(text: string) {
    this.http.getTotalData(text).subscribe((data) => {
      console.log(data);

      data.countries.forEach((element: CountryInfo) => {
        for (const bar of this.barChartData) {
          bar.data.push(element[bar.label]);
        }

        this.barChartLabels.push(element.Country);
      });

      this.data = data.global;
      this.loading = false;
    });
  }
}
