import Image from "next/image";
import logo from "@/assets/logo.png";

export function Assignee({ className }: { className?: string }) {
  return (
    <>
      <div className={`flex gap-2 ${className} -assignee`}>
        <div className="avatar items-center">
          <div className="mask mask-squircle h-5 w-5">
            <Image
              src={logo}
              alt="avatar"
              style={{ width: "40px", height: "40px" }}
            ></Image>
          </div>
        </div>
        <div className="font-light">Assignee</div>
      </div>
    </>
  );
}
