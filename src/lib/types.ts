export interface AggregatedData {
  [date: string]: {
    usage: number;
    cost: number;
  };
}

export interface AggregationResult {
  aggregatedData: AggregatedData;
  totalUsage: number;
  totalCost: number;
}
