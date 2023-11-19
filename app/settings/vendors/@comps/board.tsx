import prisma from "@/lib/db/prisma";
import Image from "next/image";
import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import EditButton from "./EditButton";

export default async function VendorBoard() {
  const vendors = await prisma.vendors.findMany({
    orderBy: { id: "desc" },
    take: 10,
  });

  return (
    <div className="w-full overflow-auto">
      <table className="table table-zebra table-xs table-auto">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Image</th>
            <th className="w-30">Address</th>
            <th className="w-30">Contact</th>
            <th className="w-20">Phone</th>
            <th>Url</th>
            <th>Email</th>
            <th className="max-w-xs">Description</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((vendor, index) => {
            return (
              <tr>
                <th>{index + 1}</th>

                <th className="whitespace-nowrap">{vendor.name?.toString()}</th>

                <td>
                  {vendor.image && (
                    <Image
                      src={vendor.image.toString()}
                      alt={vendor.name?.toString()}
                      width={50}
                      height={50}
                    />
                  )}
                </td>

                <td className="whitespace-nowrap">{vendor.address?.toString()}</td>

                <td className="whitespace-nowrap">{vendor.contact?.toString()}</td>
                
                <td className="whitespace-nowrap">{vendor.phone?.toString()}</td>
                
                <td>
                  <a target="_blank">{vendor.url?.toString()}</a>
                </td>
                
                <td>{vendor.email?.toString()}</td>
                
                <td className="max-w-xs truncate">
                  {vendor.description?.toString()}
                </td>
                
                <td>
                  <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
                    <label
                      tabIndex={0}
                      className="btn h-8 min-h-fit w-8 bg-neutral p-0 text-neutral-content hover:text-neutral-focus"
                    >
                      <More className="h-4 w-4" />
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
                    >
                      <li>
                        <EditButton vendor={vendor} />
                      </li>
                      <li>
                        <button className="flex items-center justify-start text-error hover:bg-error hover:text-neutral-50">
                          <Trash className="h-4 w-4" />
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
    </div>
  );
}
