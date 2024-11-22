import { depreciations } from "@prisma/client";
import { Listener } from "./listener";
import {Loader} from "./loader";
import {Reader} from "./reader";
import { Generator } from "./generator";
import { Asset } from "../asset/asset";

export class Depreciation{

    public static STRAIGHT_LINE_METHOD = 'straight_line'
    public static REDUCING_BALANCE_METHOD = 'reducing_balance'

    public static loader(){
        return Loader;
    }

    /**
     * 
     * @param formData
     * @returns Reader
     */
    public static reader(formData: FormData){
        return new Reader(formData);
    }

    public static on(depreciation: depreciations){
        return new Listener(depreciation);
    }


    public static run(depreciation: depreciations){
        return new Generator(depreciation);
    }


    public static getPeriod(depreciation: depreciations){
        const start_date = new Date(depreciation.start_date);
        const end_date = new Date(depreciation.end_date);

        const start_year = start_date.getFullYear();
        const end_year = end_date.getFullYear();

        if(start_year !== end_year){
            return ;
        }

        const start_period = start_date.getMonth();
        const end_period = end_date.getMonth();

        return {start_period, end_period, year: start_year}
    }


    public static async getAssets(depreciation: depreciations){
        const locations = depreciation.locations;
        if (!locations) {
          throw new Error("Invalid depreciation locations");
        }
    
        const location_ids = JSON.parse(JSON.stringify(locations));
        if (!location_ids || location_ids.length == 0) {
          throw new Error("Empty or invalid locations");
        }
    
        return await Asset.loader().getInLocations(location_ids, {depreciable:true});
    }
}