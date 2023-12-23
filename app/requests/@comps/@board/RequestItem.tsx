import RequestAttrTitle from "@/app/request/attrs/title";
import { requests } from "@prisma/client";

export function RequestItem({index, request}: {index: number, request: requests}){
    return (
        <tr>
            <th>
                {index}
            </th>
            <td>
                <RequestAttrTitle request={request} compact/>
            </td>
            <td>
                {/* <RequestAttrRequestType request={request}/> */}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    )
}