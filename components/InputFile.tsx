"use client";

import { ChangeEvent, useState } from "react";

interface FileInputProps {
  field: {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
  };
  onChange: (fileUrl: string | null) => void;
}

export default function InputFile({ field, onChange }: FileInputProps) {
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith("image")) {
      alert("Please select a valide image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        console.error("something went wrong, check your console.");
        return;
      }

      const data: { fileUrl: string } = await res.json();

      setFileUrl(data.fileUrl);

      /** Reset file input */
      e.currentTarget.type = "text";
      e.currentTarget.type = "file";
    } catch (error) {
      console.error("something went wrong, check your console.");
    }

    onChange(fileUrl);
  };

  return (
    <input
      type="file"
      placeholder="Images"
      className="file-input file-input-bordered"
      accept="image/png, image/jpeg"
      onChange={async (e) => {
        field.onChange(e);
        await handleFileChange(e);
      }}
    />
  );
}
