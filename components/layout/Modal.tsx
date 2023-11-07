"use client";

import { Root, createRoot } from "react-dom/client";
import { toast } from "react-toastify";

export function ModalContainer() {
  return <div id="js-modal"></div>;
}

export class Modal {
  private static root: Root;
  private static root_ref: HTMLElement;
  private static dialog: HTMLDialogElement;
  private static dialogs: { id: string; dialog: HTMLDialogElement }[] = [];

  static initModal(
    modal: React.ReactNode,
    callback?: (dialog: HTMLDialogElement) => void,
  ) {
    this.root_ref = document?.getElementById("js-modal") as HTMLElement;
    this.root = createRoot(this.root_ref);
    this.root.render(modal);

    setTimeout(() => {
      const dialog = this.root_ref.querySelector("dialog") as HTMLDialogElement;
      if (dialog) {
        const id = dialog.getAttribute("id");
        this.dialogs.push({ id: id?.toString() || "", dialog });

        if (typeof callback === "function") {
          callback(dialog); // Call the callback to indicate initialization is complete.
        }
      } else {
        toast.error("Dialog element not found.");
      }
    });
  }

  private static getDialogById(id: string) {
    for (let i = 0; i < Modal.dialogs.length; ++i) {
      if (id == Modal.dialogs[i].id) {
      }
    }

    return this.dialogs.find((dialog) => dialog.id == id);
  }

  private static removeDialogById(id: string) {
    const foundDialogIndex = this.dialogs.findIndex((dialog) => dialog.id === id);
  
    if (foundDialogIndex !== -1) {
      // Remove the found dialog from the array
      this.dialogs.splice(foundDialogIndex, 1);
    }
  }

  static openModal(dialog: HTMLDialogElement) {
    const id = dialog.getAttribute("id");
    if (id) {
      const foundedDialog = this.getDialogById(id);
      if (foundedDialog) {
        foundedDialog.dialog.showModal();
      } else {
        toast.error("Can not show modal");
      }
    } else {
      toast.error("Can not find dialog");
    }
  }

  static closeModal(dialog: HTMLDialogElement | string) {
    var id: string | null = null;
    if (dialog instanceof HTMLDialogElement) {
      id = dialog.getAttribute("id");
    } else if (typeof dialog === "string") {
      id = dialog;
    }

    if (id) {
      const foundedDialog = this.getDialogById(id);
      if (foundedDialog) {
        foundedDialog.dialog.remove();
        this.removeDialogById(foundedDialog.id);
      } else {
        toast.error("Can not remove modal");
      }
    } else {
      toast.error("Can not find dialog");
    }
  }
}
