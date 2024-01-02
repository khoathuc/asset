"use client";
import ModalForm from "@/components/layout/ModalForm";
import "@/styles/form.css";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { assetSchema } from "@/lib/validations/asset";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/form/Input";
import { InputSelectLocation } from "@/app/settings/locations/@input/InputSelectLocation";
import { InputSelectAssetType } from "@/app/settings/types/@input/InputSelectAssetType";
import { InputSelectVendor } from "@/app/settings/vendors/@input/InputSelectVendor";
import { toast } from "react-toastify";
import { cfieldValue, CFormInput } from "@/components/ui/cform/CFormInput";
import { addAsset } from "../actions";
import { assets } from "@prisma/client";
import { Textarea } from "@/components/ui/form/textarea";
import Plus from "@/public/plus.svg";
import { InputSelectTags } from "@/app/settings/tags/@input/InputSelectTag";
import { Type } from "@/models/type/type";

type AssetFormData = z.infer<typeof assetSchema>;

export function EditForm({
  asset,
  onClose,
}: {
  asset: assets;
  onClose: () => void;
}) {
  return <></>
}
