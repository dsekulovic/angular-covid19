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

  constructor(private http: HttpClass) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchingData();
  }

  fetchingData() {
    this.http.getTotalData().subscribe(
      (data) => {
        this.isLoading = false;
        this.chartData = data.countries;
        this.data = data.global;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }
}
