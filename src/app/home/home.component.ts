import { Component, OnInit } from "@angular/core";
import { HttpClass } from "../http.service";

import { ChartType } from "chart.js";
import { Label } from "ng2-charts";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  data;

  public pieChartLabels: Label[] = [
    "TotalDeaths",
    "TotalRecovered",
    "TotalConfirmed",
  ];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = "pie";
  public pieChartColors = [
    {
      backgroundColor: [
        "rgba(0,0,0,0.3)",
        "rgba(0,255,0,0.3)",
        "rgba(0,0,255,0.3)",
      ],
    },
  ];
  constructor(private http: HttpClass) {}

  ngOnInit(): void {
    this.http.getTotalData().subscribe((data) => {
      this.data = data.global;
      this.pieChartData = [
        this.data.TotalDeaths,
        this.data.TotalRecovered,
        this.data.TotalConfirmed,
      ];
    });
  }
}
