"use client";
import { Modal } from "@/components/layout/Modal";
import { actions, assets } from "@prisma/client";
import { useState } from "react";
import { ActionForm } from "./Form";

type AssetActionProps = {
  asset: assets;
  action: actions;
};

export default function AssetAction({ asset, action }: AssetActionProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <li>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-start text-neutral hover:bg-neutral hover:text-neutral-50"
      >
        {action.name}
      </button>
      {showModal &&
        Modal.initModal(
          <ActionForm
            asset={asset}
            action={action}
            onClose={() => setShowModal(false)}
          />,
        )}
    </li>
  );
}
