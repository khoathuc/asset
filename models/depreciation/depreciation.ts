import { depreciations } from "@prisma/client";
import { Listener } from "./listener";
import {Loader} from "./loader";
import {Reader} from "./reader";

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
}