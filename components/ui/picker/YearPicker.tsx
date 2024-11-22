"use client";
import { useState } from "react";

interface YearPickerProps {
  selectedYear: number;
  onChange: (year: number) => void;
}

export default function YearPicker({
  selectedYear,
  onChange,
}: YearPickerProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);

  return (
    <select
      value={selectedYear}
      onChange={(e) => onChange(parseInt(e.target.value))}
    >
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
