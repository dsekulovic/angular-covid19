import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ChartType } from "chart.js";
import { ICountryInfo } from "../interface/interface";
import { Label } from "ng2-charts";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent {
  @Input() chartData: ICountryInfo[];
  @Input() labels: string[];
  @Input() lineChartLabels: Label[];
  @Input() text: string;
  @Input() activeSort: string;

  @Output() loadChartData = new EventEmitter();

  lineChartType: ChartType = "line";
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

  onLoadChartData(e) {
    this.loadChartData.emit(e);
  }
}
