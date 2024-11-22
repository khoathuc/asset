import More from "@/public/more.svg";
import Trash from "@/public/trash.svg";
import { cfieldType } from "@/app/redux/features/cform";
import EditField from "../field/EditField";

export default function CFormBoard({ form }: { form: cfieldType[] }) {
  if (!form) {
    return <div>EMPTY</div>;
  }

  return (
    <div className="flex flex-col">
      {form.map((field, index) => {
        return (
          <>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <div className="text-sm font-bold">{field.name.toString()}</div>
                <div className="max-w-sm truncate text-xs font-light">
                  {field.note ? field.note.toString() : "No description"}
                </div>
              </div>
              <div className="font-bold">
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
                      <EditField field={field} />
                    </li>
                    <li>
                      <button className="flex items-center justify-start text-error hover:bg-error hover:text-neutral-50">
                        <Trash className="h-4 w-4" />
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="divider"></div>
          </>
        );
      })}
    </div>
  );
}
