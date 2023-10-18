import Pagination from "@/components/layout/Pagination";
import prisma from "@/lib/db/prisma";
import Image from "next/image";

export default async function LocationBoard({}: {}) {
  const locations = await prisma.locations.findMany({
    orderBy: { id: "desc" },
    take: 10,
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="tabel-auto table table-zebra table-xs">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Image</th>
            <th>Address</th>
            <th>Description</th>
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
                  {location.image && <Image src={location.image.toString()} alt={location.name?.toString()} width={80} height={80}/>}
                </th>
                <th>{location.address?.toString()}</th>
                <th>{location.description?.toString()}</th>
                <th>{location.status?.toString()}</th>
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination></Pagination>
    </div>
  );
}
