"use client";

import React, { useMemo } from "react";
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
import { AggregationResult } from "@/lib/types";

const UsageTable = ({
  aggregationResult,
}: {
  aggregationResult: AggregationResult;
}) => {
  const { aggregatedData, totalUsage, totalCost } = aggregationResult;

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
        {sortedDates.map((date) => (
          <TableRow key={date}>
            <TableCell className="font-medium">{date}</TableCell>
            <TableCell>{aggregatedData[date].usage.toFixed(3)}</TableCell>
            <TableCell>${aggregatedData[date].cost.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>{sortedDates.length} days</TableCell>
          <TableCell>{totalUsage.toFixed(2)} total kWH</TableCell>
          <TableCell>${totalCost.toFixed(2)} total</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default UsageTable;
