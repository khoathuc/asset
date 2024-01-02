"use client";
import {
  usePathname,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";

export function AssetNav({ params }: { params: { id: string } }) {
  const router = useRouter();
  const segment = useSelectedLayoutSegment();

  return (
    <div className="absolute inset-0 flex items-end justify-center">
      <div role="tablist" className="tabs-lifted tabs">
        <div
          role="tab"
          className={`tab ${segment === "info" ? "tab-active" : ""}`}
          onClick={() => router.push(`/asset/${params.id}/info`)}
        >
          Info
        </div>
        <div
          role="tab"
          className={`tab ${segment === "logs" ? "tab-active" : ""}`}
          onClick={() => router.push(`/asset/${params.id}/logs`)}
        >
          Logs
        </div>
        <div
          role="tab"
          className={`tab ${segment === "files" ? "tab-active" : ""}`}
          onClick={() => router.push(`/asset/${params.id}/files`)}
        >
          Files
        </div>
      </div>
    </div>
  );
}
