import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "ng2-charts";
import { AgmCoreModule } from "@agm/core";
import { AppRoutingModule } from "./app-routing.module";
import { GOOGLE_API_KEY } from "./utility/constants";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { LocationComponent } from "./location/location.component";
import { InfoCardComponent } from "./info-card/info-card.component";
import { ChartsComponent } from "./charts/charts.component";
import { FormsModule } from "@angular/forms";
import { FilterPipe } from "./location/filter.pipe";
import { TextTransformPipe } from "./charts/text-transform.pipe";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LocationComponent,
    InfoCardComponent,
    ChartsComponent,
    FilterPipe,
    TextTransformPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: GOOGLE_API_KEY,
    }),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
