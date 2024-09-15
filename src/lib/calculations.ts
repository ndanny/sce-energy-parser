import { AggregatedData, AggregationResult } from "./types";

export const calculate5to8Rate = (date: Date, hour: number): number => {
  const month = date.getMonth();
  const day = date.getDay();
  const isWeekend = day === 0 || day === 6;

  if (month >= 5 && month <= 8) {
    // June - September
    if (hour >= 17 && hour < 20) {
      return isWeekend ? 0.33 : 0.33; // Mid-Peak (Weekend) or On-Peak (Weekday)
    } else {
      return 0.28; // Off-Peak
    }
  } else {
    // October - May
    if (hour >= 8 && hour < 17) {
      return 0.26; // Super Off-Peak
    } else if (hour >= 17 && hour < 20) {
      return 0.33; // Mid-Peak
    } else {
      return 0.28; // Off-Peak
    }
  }
};

export const getAggregationResult = (data: string[]): AggregationResult => {
  const dateRangeRegex =
    /^\s*(\d{4}-\d{2}-\d{2})\s+(\d{2}):(\d{2}):(\d{2})\s+to\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s*$/;

  const aggregated: AggregatedData = {};
  let totalUsage = 0;
  let totalCost = 0;

  data.forEach((row) => {
    const match = row[0].match(dateRangeRegex);
    if (match && row.length >= 2) {
      const [_, dateStr, hourStr, minuteStr] = match;
      const date = new Date(dateStr);
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      const kWh = parseFloat(row[1]);

      if (!isNaN(kWh)) {
        const rate = calculate5to8Rate(date, hour);
        const cost = kWh * rate;

        if (!aggregated[dateStr]) {
          aggregated[dateStr] = { usage: 0, cost: 0 };
        }
        aggregated[dateStr].usage += kWh;
        aggregated[dateStr].cost += cost;

        totalUsage += kWh;
        totalCost += cost;
      }
    }
  });

  return { aggregatedData: aggregated, totalUsage, totalCost };
};
