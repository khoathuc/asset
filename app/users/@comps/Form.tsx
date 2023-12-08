import "@/styles/form.css";
import { userRegisterSchema, userEditSchema } from "@/lib/validations/user";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import ModalForm from "@/components/layout/ModalForm";
import { Input } from "@/components/ui/form/Input";
import Plus from "@/public/plus.svg";
import { Textarea } from "@/components/ui/form/textarea";
import { addUser, editUser } from "../actions";
import { users } from "@prisma/client";

type UserRegisterFormData = z.infer<typeof userRegisterSchema>;
type UserEditFormData = z.infer<typeof userEditSchema>;

export function CreateForm({ onClose }: { onClose: () => void }) {
  const [showAdditional, setShowAdditional] = useState(false);
  const method = useForm<UserRegisterFormData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const { register, formState, reset } = method;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: UserRegisterFormData) => {
    setIsLoading(true);
    var formData = new FormData();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];

        if (key == "avatar" && value instanceof FileList) {
          formData.append("avatar", data.avatar[0]);
        } else {
          formData.append(key, value);
        }
      }
    }

    try {
      await addUser(formData);
      toast.success("Successfully add a new user");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <FormProvider {...method}>
      <ModalForm
        label="CREATE NEW USER"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="flex justify-between">
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              First Name *
            </label>
            <Input
              required
              type="text"
              placeholder="First name"
              className="input input-bordered"
              {...register("first_name")}
            />
            <p className="error">{errors.first_name?.message?.toString()}</p>
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Last Name *
            </label>
            <Input
              required
              type="text"
              placeholder="Last name"
              className="input input-bordered"
              {...register("last_name")}
            />
            <p className="error">{errors.last_name?.message?.toString()}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Email *
            </label>
            <Input
              required
              type="text"
              placeholder="Email"
              className="input input-bordered"
              {...register("email")}
            />
            <p className="error">{errors.email?.message?.toString()}</p>
          </div>
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Username *
            </label>
            <Input
              required
              type="text"
              placeholder="Username"
              className="input input-bordered"
              {...register("username")}
            />
            <p className="error">{errors.username?.message?.toString()}</p>
          </div>
        </div>
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Avatar</label>
          <Input
            type="file"
            placeholder="Avatar"
            className="file-input file-input-bordered"
            accept="image/png, image/jpeg"
            {...register("avatar")}
          />
          <p className="error">{errors.avatar?.message?.toString()}</p>
        </div>

        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Password *
          </label>
          <Input
            required
            type="password"
            placeholder="Password"
            className="input input-bordered"
            {...register("password")}
          />
          <p className="error">{errors.password?.message?.toString()}</p>
        </div>
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">
            Confirm Password *
          </label>
          <Input
            required
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered"
            {...register("confirm_password")}
          />
          <p className="error">
            {errors.confirm_password?.message?.toString()}
          </p>
        </div>

        <button
          className={`flex items-center justify-center gap-3 rounded-lg bg-base-200 p-2 hover:bg-base-300 ${
            showAdditional ? "hidden" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            setShowAdditional(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Show additional information
        </button>
        <div className={`${!showAdditional ? "hidden" : ""}`}>
          <div className="flex flex-col gap-3 bg-base-200 p-5">
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Description
              </label>
              <Textarea
                className="textarea textarea-bordered"
                placeholder="Description"
                {...register("description")}
              />
            </div>

            <div className="flex justify-between">
              <div className="form-control flex w-[45%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  Phone
                </label>
                <Input
                  required
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered"
                  {...register("phone")}
                />
                <p className="error">{errors.phone?.message?.toString()}</p>
              </div>
              <div className="form-control flex w-[45%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  Job Title
                </label>
                <Input
                  required
                  type="text"
                  placeholder="Job Title"
                  className="input input-bordered"
                  {...register("job_title")}
                />
                <p className="error">{errors.job_title?.message?.toString()}</p>
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Address
              </label>
              <Input
                type="text"
                placeholder="Address"
                className="input input-bordered"
                {...register("address")}
              />
            </div>

            <div className="flex justify-between">
              <div className="form-control flex w-[30%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  Country
                </label>
                <Input
                  required
                  type="text"
                  placeholder="Country"
                  className="input input-bordered"
                  {...register("country")}
                />
                <p className="error">{errors.country?.message?.toString()}</p>
              </div>
              <div className="form-control flex w-[30%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  City
                </label>
                <Input
                  required
                  type="text"
                  placeholder="City"
                  className="input input-bordered"
                  {...register("city")}
                />
                <p className="error">{errors.city?.message?.toString()}</p>
              </div>
              <div className="form-control flex w-[30%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  State
                </label>
                <Input
                  required
                  type="text"
                  placeholder="State"
                  className="input input-bordered"
                  {...register("state")}
                />
                <p className="error">{errors.state?.message?.toString()}</p>
              </div>
            </div>
            <button
              className="mt-5 flex self-end rounded-md p-1 text-neutral "
              onClick={(e) => {
                e.preventDefault();
                setShowAdditional(false);
              }}
            >
              Hide additional information
            </button>
          </div>
        </div>
      </ModalForm>
    </FormProvider>
  );
}

export function EditForm({
  user,
  onClose,
}: {
  user: users;
  onClose: () => void;
}) {
  const [showAdditional, setShowAdditional] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const method = useForm<UserEditFormData>({
    resolver: zodResolver(userEditSchema),
  });

  const { register, formState, reset } = method;
  const { errors, isSubmitSuccessful } = formState;
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (data: UserEditFormData) => {
    setIsLoading(true);
    var formData = new FormData();
    formData.append("id", user.id.toString());

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = (data as any)[key];

        if (key == "avatar" && value instanceof FileList) {
          formData.append("avatar", data.avatar[0]);
        } else {
          formData.append(key, value);
        }
      }
    }

    try {
        await editUser(formData).then();
      toast.success("Successfully edit a new user");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
    setIsLoading(false);
  };

  return (
    <FormProvider {...method}>
      <ModalForm
        label="EDIT USER"
        onSubmit={onSubmit}
        onClose={onClose}
        noValidate={true}
      >
        <div className="flex justify-between">
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              First Name *
            </label>
            <Input
              required
              type="text"
              placeholder="First name"
              className="input input-bordered"
              {...register("first_name")}
              defaultValue={user.first_name}
            />
            <p className="error">{errors.first_name?.message?.toString()}</p>
          </div>

          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Last Name *
            </label>
            <Input
              required
              type="text"
              placeholder="Last name"
              className="input input-bordered"
              {...register("last_name")}
              defaultValue={user.last_name}
            />
            <p className="error">{errors.last_name?.message?.toString()}</p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Email *
            </label>
            <Input
              required
              type="text"
              placeholder="Email"
              className="input input-bordered"
              defaultValue={user.email || ""}
              disabled
            />
          </div>
          <div className="form-control flex flex-col">
            <label className="pb-1 text-sm font-bold text-current">
              Username *
            </label>
            <Input
              required
              type="text"
              placeholder="Username"
              className="input input-bordered"
              {...register("username")}
              defaultValue={user.username || ""}
            />
            <p className="error">{errors.username?.message?.toString()}</p>
          </div>
        </div>
        <div className="form-control flex flex-col">
          <label className="pb-1 text-sm font-bold text-current">Avatar</label>
          <Input
            type="file"
            placeholder="Avatar"
            className="file-input file-input-bordered"
            accept="image/png, image/jpeg"
            {...register("avatar")}
          />
          <p className="error">{errors.avatar?.message?.toString()}</p>
        </div>

        <button
          className={`flex items-center justify-center gap-3 rounded-lg bg-base-200 p-2 hover:bg-base-300 ${
            showChangePassword ? "hidden" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            setShowChangePassword(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Change Password
        </button>
        <div className={`${!showChangePassword ? "hidden" : ""}`}>
          <div className="flex flex-col gap-3 bg-base-200 p-5">
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Password *
              </label>
              <Input
                required
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password")}
              />
              <p className="error">{errors.password?.message?.toString()}</p>
            </div>
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Confirm Password *
              </label>
              <Input
                required
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                {...register("confirm_password")}
              />
              <p className="error">
                {errors.confirm_password?.message?.toString()}
              </p>
            </div>
            <button
              className="mt-5 flex self-end rounded-md p-1 text-neutral "
              onClick={(e) => {
                e.preventDefault();
                setShowChangePassword(false);
              }}
            >
              Hide change password
            </button>
          </div>
        </div>

        <button
          className={`flex items-center justify-center gap-3 rounded-lg bg-base-200 p-2 hover:bg-base-300 ${
            showAdditional ? "hidden" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            setShowAdditional(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Show additional information
        </button>
        <div className={`${!showAdditional ? "hidden" : ""}`}>
          <div className="flex flex-col gap-3 bg-base-200 p-5">
            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Description
              </label>
              <Textarea
                className="textarea textarea-bordered"
                placeholder="Description"
                {...register("description")}
              />
            </div>

            <div className="flex justify-between">
              <div className="form-control flex w-[45%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  Phone
                </label>
                <Input
                  required
                  type="text"
                  placeholder="Phone"
                  className="input input-bordered"
                  {...register("phone")}
                />
                <p className="error">{errors.phone?.message?.toString()}</p>
              </div>
              <div className="form-control flex w-[45%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  Job Title
                </label>
                <Input
                  required
                  type="text"
                  placeholder="Job Title"
                  className="input input-bordered"
                  {...register("job_title")}
                />
                <p className="error">{errors.job_title?.message?.toString()}</p>
              </div>
            </div>

            <div className="form-control flex flex-col">
              <label className="pb-1 text-sm font-bold text-current">
                Address
              </label>
              <Input
                type="text"
                placeholder="Address"
                className="input input-bordered"
                {...register("address")}
              />
            </div>

            <div className="flex justify-between">
              <div className="form-control flex w-[30%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  Country
                </label>
                <Input
                  required
                  type="text"
                  placeholder="Country"
                  className="input input-bordered"
                  {...register("country")}
                />
                <p className="error">{errors.country?.message?.toString()}</p>
              </div>
              <div className="form-control flex w-[30%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  City
                </label>
                <Input
                  required
                  type="text"
                  placeholder="City"
                  className="input input-bordered"
                  {...register("city")}
                />
                <p className="error">{errors.city?.message?.toString()}</p>
              </div>
              <div className="form-control flex w-[30%] flex-col">
                <label className="pb-1 text-sm font-bold text-current">
                  State
                </label>
                <Input
                  required
                  type="text"
                  placeholder="State"
                  className="input input-bordered"
                  {...register("state")}
                />
                <p className="error">{errors.state?.message?.toString()}</p>
              </div>
            </div>
            <button
              className="mt-5 flex self-end rounded-md p-1 text-neutral "
              onClick={(e) => {
                e.preventDefault();
                setShowAdditional(false);
              }}
            >
              Hide additional information
            </button>
          </div>
        </div>
      </ModalForm>
    </FormProvider>
  );
}
