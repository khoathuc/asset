"use client";
import React, { useState } from "react";
import { assets } from "@prisma/client";

export default function ExportQrButton({ asset, className}: { asset: assets, className?:string }) {

  return (
    <>
      <button className={className}>
        Export Qr
      </button>
    </>
  );
}
