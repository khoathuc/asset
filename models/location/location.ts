import { Loader } from "./loader";
import { Reader } from "./reader";
import prisma from "@/lib/db/prisma";
import { locations } from "@prisma/client";

export class Location {
  private id: string | number | null;
  public location: locations | null = null;

  constructor(id: string | number | null = null) {
    this.id = id;
  }

  async init() {
    if (this.id) {
      const location = await prisma.locations.findUnique({
        where: {
          id: Number(this.id),
        },
      });

      if (location) {
        this.location = location;
      }
    }

    return this;
  }

  public setLocation(data: any) {
    this.location = { ...this.location, ...data };
  }

  async save() {
    if(!this.location){
      return ;
    }

    if (this.location.id) {
      return await prisma.locations.update({
        where: {
          id: this.location.id,
        },
        data: this.location,
      });
    }

    return await prisma.locations.create({
      data: this.location,
    });
  }

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
