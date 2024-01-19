import { audits } from "@prisma/client";

export default function AuditAttrAssetStat({audit}:{audit: audits}){
    if(!audit.data || !audit.data.stat){
        return <></>;
    }

    const assets = audit.data.stat?.assets;
    const auditeds = audit.data.stat?.auditeds;
    
    return <>
        <div className="flex flex-col gap-2">
            <div>
                <span>Assets: </span>
                <span className="font-semibold">{assets.length}</span>
            </div>
            <div>
                <span>Audited: </span>
                <span className="font-semibold">{auditeds.length}</span>
            </div>
        </div>
    </>
}