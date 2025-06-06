"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const ViewPdf = () => {
  const searchParams = useSearchParams();
  const certificate = searchParams.get("url");
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const assetURL = process.env.NEXT_PUBLIC_ASSET_URL;

  // console.log("cdsvfdbg", searchParams.get("url"));
  const pdfURL = certificate
    ? `${assetURL}/${encodeURIComponent(certificate)}`
    : null;

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-xl font-semibold mb-4">Certificate Viewer</h1>

      {pdfURL ? (
       <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
       <Viewer
         fileUrl={pdfURL}
         plugins={[defaultLayoutPluginInstance]}
       />
     </Worker>
      ) : (
        <p className="text-red-500">No certificate URL provided.</p>
      )}
    </div>
  );
};

export default ViewPdf;
