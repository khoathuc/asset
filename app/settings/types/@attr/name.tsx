import { types } from "@prisma/client"

export default function Name({ type }: { type: types }) {
    return (
      <div className="flex flex-col pl-2">
        <div className="text-sm">{type.name.toString()}</div>
        <span className="truncate text-xs font-light max-w-sm">
          {type.description ? type.description.toString() : "No description"}
        </span>
      </div>
    )
  }