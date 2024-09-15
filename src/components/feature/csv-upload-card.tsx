"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Papa from "papaparse";
import Link from "next/link";
import UsageTable from "./usage-table";
import UsageChart from "./usage-chart";
import { AggregationResult } from "@/lib/types";
import {
  getAggregationResult,
} from "@/lib/calculations";
import { sampleData } from "@/lib/sample-data";

const CSVUploadCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[] | null>(null);
  const [aggregationResult, setAggregationResult] = useState<AggregationResult | null>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      setIsLoading(true);
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data as string[]);
          setAggregationResult(getAggregationResult(result.data as string[]));
          setIsLoading(false);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          setIsLoading(false);
        },
      });
    } else {
      console.log("No file selected");
    }
  };

  const useSampleData = () => {
    setAggregationResult(sampleData);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload CSV File</CardTitle>
        <CardDescription>
          Upload your energy usage data CSV file from{" "}
          <Link
            href="https://www.sce.com/sma/ESCAA/EscGreenButtonData"
            className="text-blue-500 font-bold"
          >
            https://www.sce.com/sma/ESCAA/EscGreenButtonData
          </Link>{" "}
          (make sure to log in first). Your data is uploaded and processed 100%
          client-side (private and secure).
        </CardDescription>
      </CardHeader>
      <CardContent>

        <div className="flex flex-col gap-4 items-center justify-center mb-4">
          <div className="flex flex-col items-center">
            <Input
              className="w-[300px] cursor-pointer"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
            <p className="text-sm text-gray-500 mt-2">Upload your CSV file</p>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Button
              size="lg"
              onClick={handleUpload}
              disabled={!file || isLoading}
            >
              {isLoading ? "Processing..." : "Submit"}
            </Button>
            {csvData && <CheckCircledIcon color="green" width={18} height={18} />}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm text-gray-500">Don't have a file?</p>
            <Button
              size="sm"
              className="border-gray-300 bg-white hover:bg-white text-black"
              onClick={useSampleData}
            >
              Use sample data
            </Button>
          </div>
        </div>
        {aggregationResult && (
          <>
            <div className="mt-5">
              <UsageChart aggregationResult={aggregationResult} />
            </div>
            <div className="mt-5">
              <UsageTable aggregationResult={aggregationResult} />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CSVUploadCard;
