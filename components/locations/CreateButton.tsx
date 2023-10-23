"use client";
import { CreateForm } from "./Form";
import { createRoot } from 'react-dom/client';

export default function CreateButton() {
  function handleClick() {
    const dialogElement = document?.getElementById(
      "js-modal",
    ) as HTMLDialogElement;

    const root = createRoot(dialogElement);
    root.render(<CreateForm/>);

    dialogElement.showModal();
  }

  return (
    <button
      className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus"
      onClick={handleClick}
    >
      Create new
    </button>
  );
}