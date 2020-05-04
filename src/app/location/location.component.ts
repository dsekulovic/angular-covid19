import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClass } from "../http.service";
import { ICountryInfo } from "../interface/interface";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
})
export class LocationComponent implements OnInit, OnDestroy {
  countries: ICountryInfo[];
  mainData: ICountryInfo[];
  latitude: number;
  longitude: number;
  isLoading: boolean = true;
  error = null;
  labels = ["Confirmed", "Recovered", "Deaths"];
  period = [0, 7, 15, 30];
  weather = { temp: null, name: "" };
  name: string;
  temp: number;
  searchText: string;
  subs: Subscription[] = [];

  constructor(private http: HttpClass, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.push(
      this.http.getAllCountries().subscribe((data) => {
        this.countries = data.sort((a: ICountryInfo, b: ICountryInfo) =>
          a.Country > b.Country ? 1 : -1
        );
      })
    );

    this.route.params.subscribe((params) => this.dataForCountry(params["id"]));
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  onSelectCountry(data: string) {
    this.searchText = "";
    this.dataForCountry(data);
  }

  dataForCountry(data: string) {
    this.subs.push(
      this.http.getDataForCountry(data).subscribe(
        (data) => {
          this.mainData = data;

          if (data.length) {
            this.latitude = +data[0].Lat;
            this.longitude = +data[0].Lon;

            this.subs.push(
              this.http.getWeather(this.latitude, this.longitude).subscribe(
                (data) => (
                  (this.weather = {
                    ...this.weather,
                    temp: Math.round(data.temp),
                    name: data.name,
                  }),
                  (this.isLoading = false)
                )
              )
            );
            this.error = null;
          } else {
            this.error = "No data!";
            this.isLoading = false;
          }
        },
        (error) => {
          this.error = error.message;
          this.isLoading = false;
        }
      )
    );
  }
}
