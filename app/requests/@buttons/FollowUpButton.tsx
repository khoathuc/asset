import { requests } from "@prisma/client";
import ArrowDown from "@/public/arrow_down.svg";
import CreateAssetButton from "./CreateAssetButton";

export default function FollowUpButton({ request }: { request: requests }) {
  return (
    <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
      <label
        tabIndex={0}
        className="btn h-8 min-h-fit bg-neutral px-2 text-neutral-content hover:text-neutral-focus "
      >
        <span className="normal-case">Follow-up actions</span>

        <ArrowDown className="h-3 w-3 fill-white hover:fill-neutral-focus" />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box z-[1] w-40 bg-base-100 p-2 shadow"
      >
        <li>
          <CreateAssetButton />
        </li>
        {/* <CreateTransactionButton /> */}
      </ul>
    </div>
  );
}
