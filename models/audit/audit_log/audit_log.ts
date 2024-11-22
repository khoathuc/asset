import { audit_logs } from "@prisma/client";
import { Loader } from "./loader";
import { Reader } from "./reader";

export type assetExportData = {
  id: number | string;
  type_id: number | string;
  name: string;
  code: string;
  status_id: number|null;
  assignee_id: string | number | null;
};

export type auditAssetLogData = {
  asset_id: number | null;
  object_export: assetExportData;
  is_correct?: boolean;
  ref?: string;
  audit_id: number;
  user_id: number;
  metatype: string;
};

export class AuditLog {
  public static loader() {
    return Loader;
  }

  /**
   * @param FormData formData
   * @returns Reader
   */
  public static reader(formData: FormData) {
    return new Reader(formData);
  }
}
