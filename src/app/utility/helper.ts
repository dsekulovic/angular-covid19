import { ChartDataSets } from "chart.js";
import { ICountryInfo } from "../interface/interface";

export function joinString(str: string) {
  return str.split(" ").join("");
}

export function initializeLabels(labels: string[]) {
  return labels.reduce((acc, el) => [...acc, { data: [], label: el }], []);
}

export function chartDataLoader(
  data: ChartDataSets[],
  filteredData: ICountryInfo[]
) {
  return data.reduce(
    (acc, el) => [
      ...acc,
      {
        data: [...filteredData.map((item) => item[joinString(el.label)])],
        label: el.label,
      },
    ],
    []
  );
}
