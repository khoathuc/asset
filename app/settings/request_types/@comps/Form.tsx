"use client"

import ModalForm from "@/components/layout/ModalForm";
import { FormProvider, useForm } from "react-hook-form";


export function CreateForm({ onClose }: { onClose: () => void }) {
	const method = useForm({});

	const onSubmit = function () {
		console.log("haha")
	}
	return (
		<FormProvider {...method}>
			<ModalForm
				label="CREATE NEW REQUEST TYPE"
				onSubmit={onSubmit}
				onClose={onClose}
				noValidate={true}
				className="max-w-3xl"
			>
			</ModalForm>
		</FormProvider>
	);
}