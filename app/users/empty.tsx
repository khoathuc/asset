import EmptyImg from "@/public/empty.svg";
import CreateButton from "./@buttons/CreateButton";
export default function Empty() {
  return (
    <div className="flex flex-col">
      <EmptyImg className="h-72" />
      <div className="flex h-8 items-center gap-5">
        <div className="text-md font-bold">No User Found</div>
        <CreateButton />
      </div>
    </div>
  );
}
