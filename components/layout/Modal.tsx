export default function Modal({ id, label, children }: { id? : string, label?: string,  children: React.ReactNode }) {
  return (
    <dialog id={id?id:'js-modal'} className="modal">
      <div className="modal-box">
        <div className="border-b-2 ">
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="text-lg font-bold">{label?label:''}</h3>
        </div>

        <div className="pb-4 pt-8">{children}</div>

        <div className="modal-action gap-3">
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
          <button
            type="submit"
            form="js-location-form"
            className="btn bg-neutral-focus text-neutral-content hover:bg-neutral hover:opacity-75"
          >
            Save
          </button>
        </div>
      </div>
    </dialog>
  );
}
