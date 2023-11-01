import ModalForm from "../layout/ModalForm";
import { editLocation } from "../../app/settings/locations/actions";
import { locations } from "@prisma/client";
import Image from "next/image";

export function EditForm({ location }: { location: locations }) {
  if (!location) {
    return <></>;
  }

  return (
    <ModalForm
      id="js-location-form"
      label="EDIT LOCATION"
      action={editLocation}
    >
      <input type="hidden" name='id' value={location?.id.toString()} ></input>
      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">
          Location Name *
        </label>
        <input
          required
          name="name"
          value={location?.name}
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
          value={location.description ?? ""}
          className="textarea textarea-bordered"
          placeholder="Description"
        />
      </div>

      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">Address</label>
        <input
          name="address"
          type="text"
          value={location.address ?? ""}
          placeholder="Location address"
          className="input input-bordered"
        />
      </div>

      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">Managers</label>
        <input
          name="owners"
          type="text"
          value={location.user_id ?? ""}
          placeholder="Managers"
          className="input input-bordered"
        />
      </div>

      <div className="flex flex-col">
        <label className="pb-1 text-sm font-bold text-current">Images</label>
        <div className='flex flex-row gap-5'>
            {location.image && (
              <Image
                src={location.image.toString()}
                alt={location.name?.toString()}
                width={120}
                height={120}
              />
            )}
            <div className="flex justify-center items-center">
              <input
                name="file"
                type="file"
                placeholder="Images"
                className="file-input file-input-bordered"
                accept="image/png, image/jpeg"
              />
            </div>
        </div>
      </div>
    </ModalForm>
  );
}
