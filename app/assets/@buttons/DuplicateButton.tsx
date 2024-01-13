import { assets } from "@prisma/client";
import Duplicate from "@/public/duplicate.svg";

export default function DuplicateButton({ asset }: { asset: assets }) {
  return (
    <>
      <button>
        <Duplicate className='h-4 w-4'/>
        Duplicate</button>
    </>
  );
}
