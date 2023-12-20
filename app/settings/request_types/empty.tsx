import EmptyImg from "@/public/empty.svg";
import CreateButton from "./@comps/CreateButton";
export default function Empty() {
  return (
    <div className="flex flex-col">
      <EmptyImg className="h-72" />
      <div className="flex h-8 items-center gap-5">
        <div className="text-md font-bold">No Request Type Found</div>
        <CreateButton />
      </div>
    </div>
  );
}
