import Pagination from "@/components/layout/Pagination";

export default function LocationBoard({}: {}) {
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
            <th>Assigned Asset</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>12/16/2020</td>
            <td>Quality Control Specialist</td>
            <td>Littel, Schaden and Vandervort</td>
            <td>Canada</td>
            <td>Blue</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <Pagination></Pagination>
    </div>
  );
}
