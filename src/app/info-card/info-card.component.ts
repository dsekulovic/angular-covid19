import { Component, OnInit, Input } from "@angular/core";
import { CovidInfo } from "../home/home.model";

@Component({
  selector: "app-info-card",
  templateUrl: "./info-card.component.html",
  styleUrls: ["./info-card.component.scss"],
})
export class InfoCardComponent implements OnInit {
  @Input() data: CovidInfo;

  constructor() {}

  ngOnInit(): void {}
}
