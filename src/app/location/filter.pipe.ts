import { Pipe, PipeTransform } from "@angular/core";
import { ICountryInfo } from "../interface/interface";
@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(items: ICountryInfo[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    return items.filter((it) =>
      it.Country.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
