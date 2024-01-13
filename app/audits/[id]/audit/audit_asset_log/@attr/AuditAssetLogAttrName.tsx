import { assetExportData } from "@/models/audit/audit_log/audit_log";

export default function AuditAssetLogAttrName({asset}:{asset:assetExportData}){
    return <>{asset.name}</>
}