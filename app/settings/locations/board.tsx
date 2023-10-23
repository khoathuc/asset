import Pagination from "@/components/layout/Pagination";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { changeStatus } from "./actions";
import ToggleStatus from "@/components/locations/ToggleStatus";

export default async function LocationBoard({}: {}) {
  const locations = await prisma.locations.findMany({
    orderBy: { id: "desc" },
    take: 10,
  });

  return (
    <div className="w-full">
      <table className="table table-zebra table-xs table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Image</th>
            <th>Address</th>
            <th className='max-w-xs'>Description</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => {
            return (
              <tr>
                <th>{index + 1}</th>

                <th>{location.name?.toString()}</th>

                <th>
                  {location.image && (
                    <Image
                      src={location.image.toString()}
                      alt={location.name?.toString()}
                      width={50}
                      height={50}
                    />
                  )}
                </th>

                <th>{location.address?.toString()}</th>

                <th className="max-w-xs truncate">{location.description?.toString()}</th>

                <th>
                  <ToggleStatus location={location} action={changeStatus} />
                </th>

                <th>
                  <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn m-1"></label>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content rounded-box z-[1] w-52 bg-base-100 p-2 shadow"
                    >
                      <li>
                        <a>Item 1</a>
                      </li>
                      <li>
                        <a>Item 2</a>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination></Pagination>
    </div>
  );
}
