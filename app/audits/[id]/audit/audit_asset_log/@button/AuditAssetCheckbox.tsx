"use client";
import { AuditAssetForm } from "@/app/audits/@form/AuditAssetForm";
import { CreateForm } from "@/app/audits/@form/CreateForm";
import { Modal } from "@/components/layout/Modal";
import { auditAssetLogData } from "@/models/audit/audit_log/audit_log";
import { audit_logs } from "@prisma/client";
import { useEffect, useState } from "react";

export default function AuditAssetCheckbox({
  asset_log,
}: {
  asset_log: audit_logs;
}) {
  const [checked, setChecked] = useState<Boolean>(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(asset_log.is_correct)
    if (asset_log.is_correct == null) {
      setChecked(false);
    }
  }, []);

  async function handleClick(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(!checked);
    
    if(!checked){
        setShowModal(true);
    }
  }

  return (
    <>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleClick}
        className="checkbox-success checkbox checkbox-xs text-white"
      />
      {showModal &&
        Modal.initModal(<AuditAssetForm asset_log={asset_log} onClose={() => setShowModal(false)} />)}
    </>
  );
}
