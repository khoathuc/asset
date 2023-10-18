import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import CreateButton from "@/components/locations/CreateButton";
import LocationBoard from "./board";
import ModalForm from "@/components/layout/ModalForm";
import { addLocation } from "./actions";

export default function Page() {
  return (
    <div className="flex flex-col">
      <PageHeader label="Locations" subLabel="Manage location">
        <Side>
          <SearchInput name="q" placeholder="Search locations"></SearchInput>
          <div className="h-8">
            <CreateButton></CreateButton>
          </div>
        </Side>
      </PageHeader>

      <div className="flex h-full w-full flex-1 justify-center pt-12">
        <div className="flex w-11/12 bg-base-100 p-3">
          <LocationBoard></LocationBoard>
        </div>
      </div>

      <ModalForm
        id="js-location-form"
        label="CREATE NEW LOCATION"
        action={addLocation}
      >
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
          <label className="pb-1 text-sm font-bold text-current">
            Managers
          </label>
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
    </div>
  );
}
