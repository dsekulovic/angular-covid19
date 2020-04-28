import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { CountryInfo } from "../interface/interface";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent implements OnInit {
  @Input() chartData: CountryInfo[];
  @Input() type: string;
  @Input() labels: string[];
  @Input() numberOfData: number;

  activeSort: string = "";

  lineChartLabels: Label[] = [];
  lineChartType: ChartType = "line";
  lineChartData: ChartDataSets[] = [
    { data: [], label: "" },
    { data: [], label: "" },
    {
      data: [],
      label: "",
    },
  ];
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
    this.loadChartData(this.labels[0]);
  }

  onClick(type: string) {
    this.loadChartData(type);
  }

  loadChartData(type: string) {
    this.activeSort = type;
    this.lineChartData = [
      { data: [], label: this.labels[0] },
      { data: [], label: this.labels[1] },
      {
        data: [],
        label: this.labels[2],
      },
    ];
    this.lineChartLabels = [];

    this.chartData
      .sort((a: CountryInfo, b: CountryInfo) => (a[type] < b[type] ? 1 : -1))
      .slice(0, this.numberOfData)
      .forEach((element: CountryInfo) => {
        for (const bar of this.lineChartData) {
          bar.data.push(element[bar.label]);
        }

        this.lineChartLabels.push(element.Country);
      });
  }
}
