"use client";

export default function CreateButton() {
  function handleClick() {
    const dialogElement = document?.getElementById(
      "js-modal-form",
    ) as HTMLDialogElement;
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
