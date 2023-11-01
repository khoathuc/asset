'use client'

import Edit from "@/public/edit.svg";
import { EditForm } from "./Form";
import { createRoot } from 'react-dom/client';
import { locations } from "@prisma/client";

export default function EditButton({location}:{location:locations}) {
  function handleClick() {
    const dialogElement = document?.getElementById(
        "js-modal",
      ) as HTMLDialogElement;
  
      const root = createRoot(dialogElement);
      root.render(<EditForm location={location} />);
  
      dialogElement.showModal();
  }
  return (
    <button onClick={handleClick}>
      <Edit className="h-4 w-4" />
      Edit
    </button>
  );
}
