import { Reader } from "./reader";
import { Loader } from "./loader";

export class RequestType{
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
}