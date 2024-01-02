import "@/styles/request.css";
import { getAllRequests, getRequestById } from "@/app/requests/actions";
import PageHeader from "@/components/layout/PageHeader";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const requests = await getAllRequests();

  return requests.map((request) => ({
    id: request.id.toString(),
  }));
}

export default async function Layout({
  params,
  children,
}: {
  params: { id: string };
  children: React.ReactNode;
}) {
  const request = await getRequestById(parseInt(params.id));
  if (!request) {
    return notFound();
  }

  return (
    <div className="request-display-page absolute inset-0">
      <PageHeader
        backUrl="/requests"
        label={`View request ${request?.name}`}
        compact
        className="request-display-header text-sm font-medium"
      ></PageHeader>
      {children}
    </div>
  );
}
