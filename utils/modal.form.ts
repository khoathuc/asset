export class Modal {
  static open(id: string) {
    const dialogElement = document?.getElementById(id) as HTMLDialogElement;

    dialogElement.showModal();
  }

  static close(id: string) {
    const dialogElement = document?.getElementById(id) as HTMLDialogElement;
    dialogElement.close();
  }
}
