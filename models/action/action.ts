import { Loader } from "./loader";
import { Reader } from "./reader";

export class Action{
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