"use client";

import React, { useState, ChangeEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Papa from "papaparse";
import Link from "next/link";
import UsageTable from "./usage-table";
import UsageChart from "./usage-chart";

type CSVRow = string[];

const CSVUploadCard: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<CSVRow[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      setIsLoading(true);
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data as CSVRow[]);
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
            this link
          </Link>{" "} (make sure to log in first). Your data is uploaded and processed 100% client-side (private and secure).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          className="w-[300px] cursor-pointer mb-4"
          type="file"
          accept=".csv"
          onChange={handleFileChange} />
        <div className="flex flex-row space-x-2 items-center">
          <Button
            onClick={handleUpload}
            disabled={!file || isLoading}>
            {isLoading ? "Processing..." : "Upload"}
          </Button>
          {csvData && (
            <CheckCircledIcon color="green" width={24} height={24} />
          )}
        </div>
        {csvData && <div className="mt-5">
          <hr />
          <UsageTable data={csvData} />
        </div>
        }
        {csvData && <div className="mt-5">
          <hr />
          <UsageChart />
        </div>
        }
      </CardContent>
    </Card>
  );
};

export default CSVUploadCard;
