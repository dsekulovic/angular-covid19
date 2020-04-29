import { Component, OnInit } from "@angular/core";
import { HttpClass } from "../http.service";

import { CovidInfo, CountryInfo } from "../interface/interface";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  data: CovidInfo;
  chartData: CountryInfo[];
  error = null;
  totalLabels: string[] = ["TotalConfirmed", "TotalRecovered", "TotalDeaths"];
  newLabels: string[] = ["NewConfirmed", "NewRecovered", "NewDeaths"];

  constructor(private http: HttpClass) {}

  ngOnInit(): void {
    this.fetchingData();
  }

  fetchingData() {
    this.isLoading = true;
    this.http.getTotalData().subscribe(
      ({ countries, global }) => {
        this.isLoading = false;
        this.chartData = countries;
        this.data = global;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }
}
