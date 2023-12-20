import PageHeader from "@/components/layout/PageHeader";
import SearchInput from "@/components/layout/SearchInput";
import Side from "@/components/layout/Side";

import Empty from "./empty";
import CreateButton from "./@comps/CreateButton";

export default async function Page() {
	// const request_types = await getAllRequestTypes();

	var html = <Empty />;
	// if (request_types && request_types.length > 0) {
	// 	html = (
	// 		<div className="flex w-8/12 bg-base-100 p-3">
	// 			<RequestTypeBoard requestTypes={request_types} />
	// 		</div>
	// 	)
	// }

	return (
		<div className="flex h-full min-h-full flex-col">
			<PageHeader label="Request Types" subLabel="Manage Request Types">
				<Side>
					<SearchInput name="q" placeholder="Search Request Types"></SearchInput>
					<div className="h-8">
						<CreateButton />
					</div>
				</Side>
			</PageHeader>

			<div className="flex h-full w-full flex-1 justify-center overflow-auto pb-12 pt-8">
				{html}
			</div>
		</div>
	)
}