"use server"
import { ComponentProps } from "react";

type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  label?: string;
} & ComponentProps<"button">;

export default async function Button({
  children,
  className,
  label,
  ...props
}: ButtonProps) {
  const {onClick} = props

  return (
    <div className="h-8">
      <button onClick={onClick} className="btn- btn h-full min-h-full bg-neutral-focus normal-case text-neutral-content hover:text-neutral-focus">
        {label}
      </button>
    </div>
  );
}
