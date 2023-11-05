"use client";
import Edit from "@/public/edit.svg";

export default function EditButton() {
  function handleClick() {
    console.log("Edit handleClick");
  }

  return (
    <>
      <button onClick={handleClick}>
        <Edit className="h-4 w-4"></Edit>
        Edit Status
      </button>
    </>
  );
}
