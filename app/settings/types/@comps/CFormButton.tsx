"use client";
import { types } from "@prisma/client";
import Custom from "@/public/custom.svg";
import { Modal } from "@/components/layout/Modal";
import CFormBuilder from "../../../../components/ui/cform/CFormBuilder";
import { useEffect, useState } from "react";

import { sync } from "@/redux/features/cform";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/redux/store";
import { JsonValue } from "@prisma/client/runtime/library";
import { editCform } from "../action";
import { toast } from "react-toastify";

export function CFormButton({ type }: { type: types }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const cform = useAppSelector((state) => state.cformReducer);

  useEffect(() => {
    dispatch(sync(type.form));
  }, [showModal]);

  const onClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (cform: JsonValue) => {
    const formData = new FormData();
    formData.append("id", type.id.toString());
    formData.append("form", JSON.stringify(cform));

    try {
      await editCform(formData);
      toast.success("Edit Custom Fields Successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }

    onClose();
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>
        <Custom className="h-4 w-4" />
        Custom Fields
      </button>
      {showModal &&
        Modal.initModal(
          <CFormBuilder
            form={cform}
            onSubmit={handleSubmit}
            label={type.name}
            onClose={onClose}
          />,
        )}
    </>
  );
}
