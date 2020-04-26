import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { LocationComponent } from "./location/location.component";

import { ChartsModule } from "ng2-charts";
import { AgmCoreModule } from "@agm/core";

/*
weather api:
http://api.openweathermap.org/data/2.5/weather?lat=lat&lon=lon&appid=c3b8f2e28ea9bf6f5d8bcb678001ab74
*/

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "location", component: LocationComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "" },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LocationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCOAZ3sQ2kjkL8f7Uoil6B3R4fT562HsXM",
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
