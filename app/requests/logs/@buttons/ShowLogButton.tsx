"use client";
import { Modal } from "@/components/layout/Modal";
import Arrow from "@/public/chevron_right.svg";
import { request_logs } from "@prisma/client";
import { useState } from "react";
import LogDisplay from "../@display/LogDisplay";

export function ShowLogButton({log}: {log: request_logs}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="h-fit rounded-full p-2 hover:bg-base-300"
        onClick={() => setShowModal(true)}
      >
        <Arrow className="h-4 w-4" />
      </button>
      {showModal &&
        Modal.initModal(<LogDisplay log={log} onClose={() => setShowModal(false)} />)}
    </>
  );
}
