import React, { useMemo } from "react";
import { calculate5to8Rate } from "@/lib/rates";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CSVRow = string[];

interface UsageTableProps {
  data: CSVRow[];
}

interface AggregatedData {
  [date: string]: {
    usage: number;
    cost: number;
  };
}

const UsageTable: React.FC<UsageTableProps> = ({ data }) => {
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
    <Table className="mt-5">
      <TableCaption>Your kWH usage per day</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Energy Usage (kWH)</TableHead>
          <TableHead>TOU-D-5-8PM Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedDates.map((date, index) => (
          <TableRow
            key={date}
          >
            <TableCell className="font-medium">{date}</TableCell>
            <TableCell>{aggregatedData[date].usage.toFixed(3)}</TableCell>
            <TableCell>${aggregatedData[date].cost.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            {sortedDates.length} days
          </TableCell>
          <TableCell>
            {totalUsage.toFixed(2)} total kWH
          </TableCell>
          <TableCell>
            ${totalCost.toFixed(2)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table >
  );
};

export default UsageTable;
