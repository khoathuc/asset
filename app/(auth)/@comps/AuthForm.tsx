"use client";
import "@/styles/form.css";
import { Input } from "@/components/ui/form/Input";
import Login from "@/public/Login.svg";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { userAuthSchema } from "@/lib/validations/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "react-toastify";
import React from "react";

type userFormData = z.infer<typeof userAuthSchema>;

export default function AuthForm() {
  const { register, formState, handleSubmit } = useForm<userFormData>({
    resolver: zodResolver(userAuthSchema),
  });

  const { errors } = formState;

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(data: userFormData) {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/"
    });

    setIsLoading(false);

    if (!signInResult?.ok) {
      toast.error("Something wrong");
    }
  }

  return (
    <div className="flex w-7/12 justify-between rounded-lg bg-base-100 p-20 shadow-2xl">
      <Login className="w-80" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-80 flex-col items-center gap-5">
          <div className="text-3xl font-extrabold text-neutral">Login</div>
          <div className="form-control flex w-full flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Email *
            </label>
            <Input
              type="text"
              placeholder="Enter email"
              className="input input-bordered"
              {...register("email")}
            />
            <p className="error">{errors.email?.message?.toString()}</p>
          </div>

          <div className="form-control flex w-full flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter password"
              className="input input-bordered"
              {...register("password")}
            />
            <p className="error">{errors.password?.message?.toString()}</p>
          </div>

          <button className="btn w-full bg-neutral-focus text-neutral-content hover:bg-neutral hover:opacity-75" disabled={isLoading}>
            {isLoading && <span className="loading loading-spinner loading-sm"></span>}
            Sign In
          </button>
          <div className="flex w-full justify-between">
            <Link href="/register" className="text-sm hover:underline">
              Register new account?
            </Link>
            <span className="text-sm hover:underline">Forgot password ?</span>
          </div>
        </div>
      </form>
    </div>
  );
}
