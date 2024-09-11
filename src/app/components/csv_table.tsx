import React, { useMemo } from "react";

type CSVRow = string[];

interface CSVTableProps {
  data: CSVRow[];
}

interface AggregatedData {
  [date: string]: number;
}

const CSVTable: React.FC<CSVTableProps> = ({ data }) => {
  const dateRangeRegex =
    /^\s*(\d{4}-\d{2}-\d{2})\s+\d{2}:\d{2}:\d{2}\s+to\s+\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}:\d{2}\s*$/;

  const processedData = data.filter((row) => {
    if (row.length < 2) return false;
    if (!dateRangeRegex.test(row[0].trim())) return false;
    const num = parseFloat(row[1]);
    return !isNaN(num);
  });

  const aggregatedData = useMemo(() => {
    const aggregated: AggregatedData = {};

    processedData.forEach((row) => {
      const match = row[0].match(dateRangeRegex);
      if (match) {
        const date = match[1];
        const kWh = parseFloat(row[1]);

        if (!isNaN(kWh)) {
          aggregated[date] = (aggregated[date] || 0) + kWh;
        }
      }
    });

    return aggregated;
  }, [processedData]);

  const sortedDates = useMemo(() => {
    return Object.keys(aggregatedData).sort();
  }, [aggregatedData]);

  if (processedData.length === 0) return null;

  return (
    <div className="mt-8 space-y-8">
      {/** <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Processed Data</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Time Range</th>
              <th className="py-2 px-4 border-b">Energy Usage (kWh)</th>
            </tr>
          </thead>
          <tbody>
            {processedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-2 px-4 border-b">{row[0]}</td>
                <td className="py-2 px-4 border-b">{row[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-4">Aggregated Data</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Total Energy Usage (kWh)</th>
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
                  {aggregatedData[date].toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CSVTable;
