"use client";

import { DeprecationRecordType } from "@/models/depreciation/generator";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { DepreciationExporter } from "../exporter";

export default function ExportButton({depreciation_records, name}:{name: string, depreciation_records: DeprecationRecordType[]}) {
  const [isLoading, setIsloading] = useState(false);
  const onClick = async () => {
    setIsloading(true);
    try {
        const exporter = new DepreciationExporter(depreciation_records);
        exporter.setName(name);
        exporter.export();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setIsloading(false);
  };

  return (
    <>
      <button
        className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus"
        onClick={() => {
          onClick();
        }}
        disabled={isLoading}
      >
        {isLoading && (
          <span className="loading loading-spinner loading-sm"></span>
        )}
        Export Excel
      </button>
    </>
  );
}
