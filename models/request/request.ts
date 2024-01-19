import { requests, users } from "@prisma/client";
import { Loader } from "./loader";
import { Reader } from "./reader";
import { Checkout } from "./checkout";
import { Listener } from "./listener";
import { Stat } from "./stat";

export class Request{
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


    public static checkout(request: requests, approver:users|null = null, rejector:users|null = null){
        return new Checkout(request, approver, rejector);
    }


    public static on(request: requests){
        return new Listener(request);
    }


    public static stat(){
        return new Stat();
    }
}