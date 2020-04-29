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
    this.lineChartData = this.labels.reduce(
      (acc, el) => [...acc, { data: [], label: el }],
      []
    );
    this.loadChartData(this.labels[0]);
  }

  onClick(type: string) {
    this.loadChartData(type);
  }

  loadChartData(type: string) {
    this.activeSort = type;

    const fiteredData = this.chartData
      .sort((a: CountryInfo, b: CountryInfo) => (a[type] < b[type] ? 1 : -1))
      .slice(0, this.numberOfData);

    this.lineChartData = this.lineChartData.reduce(
      (acc, el) => [
        ...acc,
        {
          data: [...fiteredData.map((item) => item[el.label])],
          label: el.label,
        },
      ],
      []
    );

    this.lineChartLabels = fiteredData.map((el) => el.Country);
  }
}
