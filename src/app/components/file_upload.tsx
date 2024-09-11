"use client";

import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";

type CSVRow = string[];

const FileUpload: React.FC = () => {
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

  const renderCsvData = () => {
    if (!csvData || csvData.length === 0) return null;

    return (
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 px-4 border-b border-r">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-6 bg-white border border-slate-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Upload your SCE CSV file</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100
        "
      />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        disabled={!file || isLoading}
      >
        {isLoading ? "Processing..." : "Upload and Process"}
      </button>
      {csvData && (
        <p className="mt-4 text-green-600">
          CSV data loaded successfully! {csvData.length} rows parsed.
        </p>
      )}
      {renderCsvData()}
    </div>
  );
};

export default FileUpload;
