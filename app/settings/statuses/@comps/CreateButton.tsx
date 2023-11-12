"use client";
import { Modal } from "@/components/layout/Modal";
import { CreateForm } from "./Form";
import { useState } from "react";

export default function CreateButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus"
        onClick={() => setShowModal(true)}
      >
        Create new
      </button>
      {showModal &&
        Modal.initModal(<CreateForm onClose={() => setShowModal(false)} />)}
    </>
  );
}
