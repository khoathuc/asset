import ModalForm from "../layout/ModalForm";
import {addLocation} from "../../app/settings/locations/actions"

export function CreateForm() {
  return (
    <ModalForm id="js-location-form" label="CREATE NEW LOCATION" action={addLocation}>
      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">
          Location Name *
        </label>
        <input
          required
          name="name"
          type="text"
          placeholder="Location name"
          className="input input-bordered"
        />
      </div>

      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">
          Description
        </label>
        <textarea
          name="description"
          className="textarea textarea-bordered"
          placeholder="Description"
        />
      </div>

      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">Address</label>
        <input
          name="address"
          type="text"
          placeholder="Location address"
          className="input input-bordered"
        />
      </div>

      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">Managers</label>
        <input
          name="owners"
          type="text"
          placeholder="Managers"
          className="input input-bordered"
        />
      </div>

      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">Images</label>
        <input
          name="file"
          type="file"
          placeholder="Images"
          className="file-input file-input-bordered"
          accept="image/png, image/jpeg"
        />
      </div>
    </ModalForm>
  );
}