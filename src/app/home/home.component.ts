import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClass } from "../http.service";
import { ICovidInfo, ICountryInfo } from "../interface/interface";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  data: ICovidInfo;
  chartData: ICountryInfo[];
  error = null;
  totalLabels: string[] = ["TotalConfirmed", "TotalRecovered", "TotalDeaths"];
  newLabels: string[] = ["NewConfirmed", "NewRecovered", "NewDeaths"];
  dataSubscription$: Subscription;

  constructor(private http: HttpClass) {}

  ngOnInit(): void {
    this.fetchingData();
  }

  fetchingData() {
    this.isLoading = true;
    this.dataSubscription$ = this.http.getTotalData().subscribe(
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

  ngOnDestroy() {
    this.dataSubscription$.unsubscribe();
  }
}
