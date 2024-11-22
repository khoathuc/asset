import AssetStat from "./AssetStat";
import LocationStat from "./LocationStat";
import RequestStat from "./RequestStat";
import UserStat from "./UserStat";
import VendorStat from "./VendorStat";

export default function Stats(){
    return (
        <div className="flex justify-between stats shadow stats-vertical lg:stats-horizontal">
            <AssetStat />
            <UserStat />
            <RequestStat />
            <LocationStat />
            <VendorStat />
        </div>
    )
}