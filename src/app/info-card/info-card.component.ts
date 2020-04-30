import { Component, Input } from "@angular/core";
import { ICovidInfo } from "../interface/interface";

@Component({
  selector: "app-info-card",
  templateUrl: "./info-card.component.html",
  styleUrls: ["./info-card.component.scss"],
})
export class InfoCardComponent {
  @Input() data: ICovidInfo;

  constructor() {}
}
