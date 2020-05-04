import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "texttransform",
})
export class TextTransformPipe implements PipeTransform {
  transform(data: any): string {
    if (typeof data === "number") {
      return data ? `Last ${data} days` : "Whole period";
    }
    if (data.includes("Total")) return data.replace("Total", "Total ");
    if (data.includes("New")) return data.replace("New", "New ");
  }
}
