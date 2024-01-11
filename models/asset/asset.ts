import { assets } from "@prisma/client";
import { Loader } from "./loader";
import { Reader } from "./reader";
import { Listener } from "./listener";
import { Caculate } from "./caculate";

export class Asset{
    public static loader(){
        return Loader;
    }

    /**
     * @param FormData formData
     * @returns Reader
     */
    public static reader(formData: FormData){
        return new Reader(formData);
    }


    public static on(asset: assets){
        return new Listener(asset);
    }
  
    public static caculate(asset: assets){
        return new Caculate(asset);
    }
}