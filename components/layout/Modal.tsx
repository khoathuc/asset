"use client";

import { useEffect } from "react";
import { Root, createRoot } from "react-dom/client";

export function ModalContainer() {
  return <div id="js-modal"></div>;
}

export class Modal {
  private static root: Root;
  private static root_ref: HTMLElement;
  private static dialog: HTMLDialogElement;
  
  static initModal(modal: React.ReactNode, callback: () => void) {
    this.root_ref = document?.getElementById("js-modal") as HTMLElement;
    this.root = createRoot(this.root_ref);
    this.root.render(modal);

    setTimeout(() => {
      const dialog = this.root_ref.querySelector("dialog") as HTMLDialogElement;
      if (dialog) {
        this.dialog = dialog;

        if (typeof callback === "function") {
          callback(); // Call the callback to indicate initialization is complete.
        }
      } else {
        console.log("Dialog element not found.");
      }
    });
  }

  static openModal() {
    if(this.dialog){
      this.dialog.showModal();
    }
  }

  static closeModal() {
    this.root.unmount()
  }
}
