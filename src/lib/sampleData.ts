import { AggregatedData, AggregationResult } from "./types";

const aggregatedData: AggregatedData = {
  "2024-09-04": { usage: 20.000000000000004, cost: 5.717500000000002 },
  "2024-09-05": { usage: 11.370000000000003, cost: 3.2631000000000006 },
  "2024-09-06": { usage: 15.250000000000002, cost: 4.440000000000001 },
  "2024-09-07": { usage: 10.539999999999994, cost: 2.966200000000002 },
  "2024-09-08": { usage: 5.8799999999999955, cost: 1.6859000000000008 },
  "2024-09-09": { usage: 8.259999999999996, cost: 2.3273 },
  "2024-09-10": { usage: 3.1000000000000005, cost: 0.8850000000000001 },
  "2024-09-11": { usage: 3.4699999999999984, cost: 0.9986 },
  "2024-09-12": { usage: 4.529999999999999, cost: 1.2814 },
  "2024-09-13": { usage: 3.23, cost: 0.9274000000000002 },
};
const totalCost = Object.values(aggregatedData).reduce((sum, data) => sum + data.cost, 0);
const totalUsage = Object.values(aggregatedData).reduce((sum, data) => sum + data.usage, 0);

export const sampleData: AggregationResult = {
  aggregatedData, totalCost, totalUsage
}
