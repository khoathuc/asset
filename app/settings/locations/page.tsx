"use client";

import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";
import LocationBoard from "./board";
import Image from 'next/image'
import { addLocation } from "./actions";

function handleClick() {
  const dialogElement = document?.getElementById(
    "my_modal_1",
  ) as HTMLDialogElement;
  dialogElement.showModal();
}

export default function Page() {
  return (
    <div className="flex flex-col">
      <Image src={''} alt={"asdf"} width={400} height={400}></Image>
      <PageHeader label="Locations" subLabel="Manage location">
        <Side>
          <SearchInput name="q" placeholder="Search locations"></SearchInput>

          <div className="h-8">
            <button
              className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus"
              onClick={handleClick}
            >
              Create new
            </button>
          </div>
        </Side>
      </PageHeader>

      <div className="flex h-full w-full flex-1 justify-center pt-12">
        <div className="flex w-11/12 bg-base-100 p-3">
          <LocationBoard></LocationBoard>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="border-b-2 ">
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="text-lg font-bold">CREATE LOCATION</h3>
          </div>

          <div className="pb-4 pt-8">
            <form
              id="js-location-form"
              className="flex flex-col gap-3"
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
                <label className="pb-1 text-sm font-bold text-current">
                  Images
                </label>
                <input
                  name="file"
                  type="file"
                  placeholder="Images"
                  className="file-input file-input-bordered"
                  accept="image/png, image/jpeg"
                />
              </div>
            </form>
          </div>

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
    </div>
  );
}
