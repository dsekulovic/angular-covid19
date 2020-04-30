import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { ICountryInfo } from "../interface/interface";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-charts",
  templateUrl: "./charts.component.html",
  styleUrls: ["./charts.component.scss"],
})
export class ChartsComponent implements OnInit, OnChanges {
  @Input() chartData: ICountryInfo[];
  @Input() type: string;
  @Input() labels: string[];
  @Input() numberOfData: number;
  @Input() period: number[];

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.lineChartData = this.labels.reduce(
      (acc, el) => [...acc, { data: [], label: el }],
      []
    );
    // this.location = this.route.url.value[0].path;

    this.loadChartData(this.labels[0]);
  }

  ngOnChanges(changes: SimpleChanges) {
    let id = "";
    this.route.params.subscribe((params) => (id = params["id"]));

    this.loadChartData(id);
  }

  onClick(type: any) {
    this.loadChartData(type);
  }

  loadChartData(type: any) {
    this.activeSort = type;
    let filteredData = [];
    if (this.period) {
      filteredData = this.chartData.slice(0 - type);
    } else {
      filteredData = this.chartData
        .sort((a: ICountryInfo, b: ICountryInfo) =>
          a[type] < b[type] ? 1 : -1
        )
        .slice(0, this.numberOfData);
    }

    this.lineChartData = this.lineChartData.reduce(
      (acc, el) => [
        ...acc,
        {
          data: [...filteredData.map((item) => item[el.label])],
          label: el.label,
        },
      ],
      []
    );
    if (this.period) {
      this.lineChartLabels = filteredData.map((el) => el.Date);
    } else {
      this.lineChartLabels = filteredData.map((el) => el.Country);
    }
  }
}
