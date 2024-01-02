import { NextRequest } from "next/server"
import {Location} from "@/models/location/location";
import {Type} from "@/models/type/type";
import { Status } from "@/models/status/status";
import { User } from "@/models/user/user";
import { Tag } from "@/models/tag/tag";
import { Vendor } from "@/models/vendor/vendor";
import { Action } from "@/models/action/action";
import { RequestType } from "@/models/request_type/request_type";

export async function GET(req: NextRequest){
    try{
        const locations = await Location.loader().paginate();
        const types = await Type.loader().all();
        const statuses = await Status.loader().all();
        const users = await User.loader().all();
        const tags = await Tag.loader().all();
        const vendors = await Vendor.loader().all();
        const actions = await Action.loader().paginate();
        const requestTypes = await RequestType.loader().paginate();

        return Response.json({locations, types, statuses, users, tags, vendors, actions, requestTypes})
    }catch(error){
        return new Response("Server error", {status: 500})
    }
}