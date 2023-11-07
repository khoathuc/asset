"use client";
import "@/styles/form.css";
import ModalForm from "@/components/layout/ModalForm";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { typeSchema } from "@/lib/validations/types";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { addType, editType } from "../action";
import { types } from "@prisma/client";

type TypeFormData = z.infer<typeof typeSchema>;

export function CreateForm() {
	const methods = useForm<TypeFormData>({
		resolver: zodResolver(typeSchema),
	});

	const { register, formState, reset } = methods;
	const { errors, isSubmitSuccessful } = formState;
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

	const onSubmit = async (data: TypeFormData) => {
		setIsLoading(true);

		const formData = new FormData();
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				const value = (data as any)[key];
				formData.append(key, value);
			}
		}

		try {
			await addType(formData);
			toast.success("Successfully add new type");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}

		setIsLoading(false);
	};

	return (
		<FormProvider {...methods}>
			<ModalForm
				label="CREATE NEW ASSET TYPE"
				onSubmit={onSubmit}
				noValidate={true}
			>
				<div className="form-control flex flex-col">
					<label className="pb-1 text-sm font-bold text-current">
						Asset Type Name *
					</label>
					<Input
						type="text"
						placeholder="Asset Type name"
						className="input input-bordered"
						{...register("name")}
					/>
					<p className="error">{errors.name?.message?.toString()}</p>
				</div>

				<div className="form-control flex flex-col">
					<label className="pb-1 text-sm font-bold text-current">
						Code prefix *
					</label>
					<Input
						type="text"
						placeholder="Leave blank for auto generate"
						className="input input-bordered"
						{...register("prefix")}
					/>
					<p className="error">{errors.prefix?.message?.toString()}</p>
					<p className="text-xs text-zinc-700">
						* Custom Code Prefix for Assets and Accessories in this type
					</p>
				</div>

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
			</ModalForm>
		</FormProvider>
	);
}

export function EditForm({ type }: { type: types }) {
	const methods = useForm<TypeFormData>({
		resolver: zodResolver(typeSchema),
	});

	const { register, formState, reset } = methods;
	const { errors, isSubmitSuccessful } = formState;
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
		}
	}, [isSubmitSuccessful, reset]);

	const onSubmit = async (data: TypeFormData) => {
		setIsLoading(true);

		const formData = new FormData();
		formData.append("id", type.id.toString());
		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				const value = (data as any)[key];
				formData.append(key, value);
			}
		}

		try {
			await editType(formData);
			toast.success("Edit Asset Type Successfully");
		} catch (error) {
			if (error instanceof Error) {
				toast.error(error.message);
			}
		}

		setIsLoading(false);
	};

	return (
		<FormProvider {...methods}>
			<ModalForm
				label="CREATE NEW ASSET TYPE"
				onSubmit={onSubmit}
				noValidate={true}
			>
				<div className="form-control flex flex-col">
					<label className="pb-1 text-sm font-bold text-current">
						Asset Type Name *
					</label>
					<Input
						type="text"
						placeholder="Asset Type name"
						className="input input-bordered"
						{...register("name")}
						defaultValue={type.name.toString()}
					/>
					<p className="error">{errors.name?.message?.toString()}</p>
				</div>

				<div className="form-control flex flex-col">
					<label className="pb-1 text-sm font-bold text-current">
						Code prefix *
					</label>
					<Input
						type="text"
						placeholder="Leave blank for auto generate"
						className="input input-bordered"
						{...register("prefix")}
						defaultValue={type.prefix.toString()}
					/>
					<p className="error">{errors.prefix?.message?.toString()}</p>
					<p className="text-xs text-zinc-700">
						* Custom Code Prefix for Assets and Accessories in this type
					</p>
				</div>

				<div className="form-control flex flex-col">
					<label className="pb-1 text-sm font-bold text-current">
						Description
					</label>
					<Textarea
						className="textarea textarea-bordered"
						placeholder="Description"
						{...register("description")}
						defaultValue={type.description || ""}
					/>
				</div>
			</ModalForm>
		</FormProvider>
	);
}
