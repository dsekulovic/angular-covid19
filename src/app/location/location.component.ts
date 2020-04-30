import { Component, OnInit } from "@angular/core";
import { HttpClass } from "../http.service";
import { ICountryInfo } from "../interface/interface";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.scss"],
})
export class LocationComponent implements OnInit {
  countries: ICountryInfo[];
  mainData: ICountryInfo[];
  latitude = 40.4045067;
  longitude = 49.8724673;
  isLoading: boolean = true;
  error = null;
  labels = ["Confirmed", "Recovered", "Deaths"];
  period = [0, 7, 15, 30];
  name: string;
  temp: number;
  searchText: string;

  constructor(private http: HttpClass, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this http call won't be needed with NgRx
    this.http.getAllCountries().subscribe((data) => {
      this.countries = data.sort((a: ICountryInfo, b: ICountryInfo) =>
        a.Country > b.Country ? 1 : -1
      );
    });

    let id = "sebia";
    this.route.params.subscribe((params) => (id = params["id"]));

    this.dataForCountry(id);
  }

  onClick(data: string) {
    this.searchText = "";
    this.dataForCountry(data);
  }

  dataForCountry(data: string) {
    this.http.getDataForCountry(data).subscribe((data) => {
      this.mainData = data;

      if (data.length) {
        this.latitude = +data[0].Lat;
        this.longitude = +data[0].Lon;

        this.http
          .getWeather(this.latitude, this.longitude)
          .subscribe(
            (data) => (
              (this.temp = Math.round(data.temp)),
              (this.name = data.name),
              (this.isLoading = false)
            )
          );
        this.error = null;
      } else {
        this.error = "No data!";
        this.isLoading = false;
      }
    });
  }
}
