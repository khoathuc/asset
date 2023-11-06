"use client";
import { types } from "@prisma/client";
import Custom from "@/public/custom.svg";

export function CFormButton({ type }: { type: types }) {
  function handleClick() {
    console.log("handleClick");
  }
  return (
    <button onClick={handleClick}>
      <Custom className="h-4 w-4" />
      Custom Fields
    </button>
  );
}
