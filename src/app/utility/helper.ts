import { ChartDataSets } from "chart.js";

export function joinString(str: string) {
  return str.split(" ").join("");
}

export function initializeLabels(labels: string[]) {
  return labels.reduce((acc, el) => [...acc, { data: [], label: el }], []);
}

export function chartDataLoader(
  data: ChartDataSets[],
  filteredData: ChartDataSets[]
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
