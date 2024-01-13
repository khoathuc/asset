import { audits } from "@prisma/client";
import ArrowDown from "@/public/arrow_down.svg";
import More from "@/public/more.svg";

export default function AuditActionsButton({ audit }: { audit: audits }) {
  return (
    <div className="dropdown dropdown-end dropdown-bottom dropdown-hover">
      <label
        tabIndex={0}
        className="btn h-8 min-h-fit bg-neutral px-2 text-neutral-content hover:text-neutral-focus "
      >
        <More className="h-5 w-5 fill-white hover:fill-neutral-focus" />
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content rounded-box z-[1] w-44 bg-base-100 p-2 shadow"
      >
        
        <li className="tooltip tooltip-right" data-tip="Extends Audit">
        </li>
        <li className="tooltip tooltip-right" data-tip="Edit Audit">
        </li>
        <li className="tooltip tooltip-right" data-tip="Remove audit">
        </li>
      </ul>
    </div>
  );
}
