import { Loader } from "./loader";
import { Reader } from "./reader";
import prisma from "@/lib/db/prisma";
import { locations } from "@prisma/client";


//For best case, this class should be has all property of location schema 
//and implement more interface function 
export class Location {
  public static loader() {
    return Loader;
  }


  public static reader(){
    return Reader;
  }

  // Need to think more about this class
  // public static reader() {
  //   return new Reader();
  // }
}
