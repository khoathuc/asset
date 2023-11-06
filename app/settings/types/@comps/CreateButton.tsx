"use client"
import { Modal } from "@/components/layout/Modal";
import { CreateForm } from "./Form";

export default function CreateButton() {
    function handleClick(){
        Modal.initModal(<CreateForm />, ()=>{
            Modal.openModal();
        })
    }
  return (
    <>
      <button
        className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus"
        onClick={handleClick}
      >
        Create new
      </button>
    </>
  );
}
