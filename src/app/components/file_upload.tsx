"use client";

import React, { useState, ChangeEvent } from "react";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const csvContent = event.target?.result as string;
        setCsvData(csvContent);
        setIsLoading(false);
      };
      reader.readAsText(file);
    } else {
      console.log("No file selected");
    }
  };

  const renderCsvData = () => {
    if (!csvData) return null;

    const rows = csvData.split("\n");
    const headers = rows[0].split(",");

    return (
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, index) => (
                <th key={index} className="py-2 px-4 border-b">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.split(",").map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 px-4 border-b">
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
    <div className="p-6 mt-8 bg-white border border-slate-200 rounded-lg">
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
        <p className="mt-4 text-green-600">CSV data loaded successfully!</p>
      )}
      {renderCsvData()}
    </div>
  );
};

export default FileUpload;
