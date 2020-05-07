import { Component, OnInit, Input } from "@angular/core";
import { ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { ICountryInfo } from "../interface/interface";
import {
  joinString,
  chartDataLoader,
  initializeLabels,
} from "../utility/helper";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent implements OnInit {
  @Input() chartData: ICountryInfo[];
  @Input() labels: string[];
  @Input() numberOfData: number;

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

  constructor() {}

  ngOnInit(): void {
    this.lineChartData = initializeLabels(this.labels);

    this.loadChartData(this.labels[0]);
  }

  onLoadChartData(type: string) {
    this.loadChartData(type);
  }

  loadChartData(type: string) {
    this.activeSort = joinString(type);
    let filteredData = [];

    filteredData = this.chartData
      .sort((a: ICountryInfo, b: ICountryInfo) =>
        a[this.activeSort] < b[this.activeSort] ? 1 : -1
      )
      .slice(0, this.numberOfData);
    this.text = `20 countries with most ${this.activeSort} cases`;

    this.lineChartData = chartDataLoader(this.lineChartData, filteredData);

    this.lineChartLabels = filteredData.map((el) => el.Country);
  }
}
