import React, { useMemo } from "react";
import { calculate5to8Rate } from "@/app/lib/rates"

type CSVRow = string[];

interface CSVTableProps {
  data: CSVRow[];
}

interface AggregatedData {
  [date: string]: {
    usage: number;
    cost: number;
  };
}

const CSVTable: React.FC<CSVTableProps> = ({ data }) => {
  const dateRangeRegex =
    /^\s*(\d{4}-\d{2}-\d{2})\s+(\d{2}):(\d{2}):(\d{2})\s+to\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s*$/;

  const { aggregatedData, totalUsage, totalCost } = useMemo(() => {
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
  }, [data]);

  const sortedDates = useMemo(() => {
    return Object.keys(aggregatedData).sort();
  }, [aggregatedData]);

  if (sortedDates.length === 0) return null;

  return (
    <div className="mt-8 space-y-8">
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Aggregated Data</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total Energy Usage (kWh)</th>
              <th className="py-2 px-4 border-b">Total Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {sortedDates.map((date, index) => (
              <tr
                key={date}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4 border-b">{date}</td>
                <td className="py-2 px-4 border-b">
                  {aggregatedData[date].usage.toFixed(3)}
                </td>
                <td className="py-2 px-4 border-b">
                  ${aggregatedData[date].cost.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-gray-100 p-4 rounded-md">
        <p className="font-bold">Summary</p>
        <p>Total Energy Usage: {totalUsage.toFixed(3)} kWh</p>
        <p>Total Cost: ${totalCost.toFixed(2)}</p>
        <p>
          Average Daily Usage: {(totalUsage / sortedDates.length).toFixed(3)}
          kWh
        </p>
      </div>
    </div>
  );
};

export default CSVTable;
