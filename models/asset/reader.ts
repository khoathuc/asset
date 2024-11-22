import { Type } from "../type/type";
import { Location } from "../location/location";
import { Vendor } from "../vendor/vendor";
import { Status } from "../status/status";
import { isValidDateFormat } from "@/lib/utils/datetime";
import { isValidPriceFormat } from "@/lib/utils/price";
import { uploadFile } from "@/app/base/file";

var randomstring = require("randomstring");

export class Reader {
  public formData?: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  readName() {
    const name = this.formData?.get("name")?.toString();
    if (!name) {
      throw new Error("Name is required");
    }

    return name;
  }

  readDesc() {
    return this.formData?.get("description")?.toString();
  }

  async readType() {
    const type_id = this.formData?.get("type_id")?.toString();
    if (type_id) {
      const type = await Type.loader().getById(parseInt(type_id));
      if (!type) {
        throw new Error("This type is not exist");
      }
      return type;
    }

    throw new Error("Type is invalid");
  }

  async readCode() {
    var code = this.formData?.get("code")?.toString();
    if (code) {
      return code;
    }

    const type = await this.readType();
    const rand = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });

    if (type) {
      return `${type.prefix}_${rand}`;
    }
    throw new Error("Invalid Code");
  }

  readTag() {
    const tag_ids = this.formData?.get("tag_ids")?.toString();
    if (!tag_ids) {
      return;
    }
    return JSON.parse(tag_ids);
  }

  readSerialNumber() {
    return this.formData?.get("serial_number")?.toString();
  }


  async readLocation() {
    const location_id = this.formData?.get("location_id")?.toString();
    if (location_id) {
      const location = await Location.loader().getById(parseInt(location_id));
      
      if(!location){
        throw new Error("This location is not exist");
      }
  
      return location;
    }
  
    throw new Error("Location is invalid");
  }


  async readVendor() {
    const vendor_id = this.formData?.get("vendor_id")?.toString();
    if (vendor_id) {
      const vendor = await Vendor.loader().getById(parseInt(vendor_id));
  
      if(!vendor){
        throw new Error("This vendor is not exist");
      }
  
      return vendor;
    }
  
    throw new Error("Vendor is invalid");
  }


  async readStatus() {
    const status_id = this.formData?.get("status_id")?.toString();
    var status;
    if (!status_id) {
      status = await Status.loader().getDefault();
    }else{
      status =  await Status.loader().getById(parseInt("status_id"));
    }
  
    if(!status){
      throw new Error("Status is not exist");
    }
  
    return status;
  }


  readActiveDate() {
    var active_date = this.formData?.get("active_date")?.toString();
  
    if (!active_date) {
      throw new Error("Active Date is required");
    }
  
    if (!isValidDateFormat(active_date)) {
      throw new Error("Active Date is wrong format");
    }
  
    return new Date(active_date);
  }


  readCForm() {
    const form = this.formData?.get("form")?.toString();
    if (!form) {
      return;
    }
    return JSON.parse(form);
  }

  async readImage(){
    const file: File | null = this.formData?.get("image") as unknown as File;
    var image_url;
    if (file) {
      image_url = await uploadFile(file);
    }
    
    return image_url;
  }

  readPurchasePrice() {
    const purchase_price = this.formData?.get("purchase_price")?.toString();
  
    if (!purchase_price) {
      throw new Error("Purchase price is required");
    }
  
    if (!isValidPriceFormat(purchase_price)) {
      throw new Error("Invalid price format");
    }
  
    return purchase_price;
  }


  private readDepreciation(){
    const depreciation =this.formData?.get("depreciation")?.toString();
    
    if(!depreciation){
      return ;
    }
    
    return JSON.parse(depreciation);
  }

  async read() {
    const name = this.readName();

    const description = this.readDesc();

    const code = await this.readCode();

    const tag_ids = this.readTag();

    const serial_number = this.readSerialNumber();

    const type_id = await this.readType().then((res) => {
      return res.id;
    });

    const location_id = await this.readLocation().then((res) => {
      return res.id;
    });

    const vendor_id = await this.readVendor().then((res) => {
      return res.id;
    });

    const status_id = await this.readStatus().then((res) => {
      return res.id;
    });

    const active_date = this.readActiveDate();

    const form = this.readCForm();

    const image = await this.readImage();

    const purchase_price = this.readPurchasePrice();

    const depreciation = this.readDepreciation();

    return {
      name,
      description,
      code,
      tag_ids,
      serial_number,
      type_id,
      location_id,
      vendor_id,
      status_id,
      active_date,
      form,
      image,
      depreciation,
      purchase_price,
    };
  }
}
