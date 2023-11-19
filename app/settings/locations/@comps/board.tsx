import Pagination from "@/components/layout/Pagination";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import { changeStatus } from "../actions";
import ToggleStatus from "@/app/settings/locations/@comps/ToggleStatus";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import EditButton from "@/app/settings/locations/@comps/EditButton";

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

                <td>
                  {location.image && (
                    <Image
                      src={location.image.toString()}
                      alt={location.name?.toString()}
                      width={50}
                      height={50}
                    />
                  )}
                </td>

                <td>{location.address?.toString()}</td>

                <td className="max-w-xs truncate">{location.description?.toString()}</td>

                <td>
                  <ToggleStatus location={location} action={changeStatus} />
                </td>

                <td>
                  <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                    <label tabIndex={0} className="btn h-8 w-8 p-0 min-h-fit bg-neutral text-neutral-content hover:text-neutral-focus">
                      <More className='w-4 h-4'/>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
                    >
                      <li>
                        <EditButton location={location}/>
                      </li>
                      <li>
                        <button className='flex justify-start items-center text-error hover:bg-error hover:text-neutral-50'>
                          <Trash className='h-4 w-4'/>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination></Pagination>
    </div>
  );
}
