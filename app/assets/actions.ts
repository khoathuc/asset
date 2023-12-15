"use server";

import { uploadFile } from "@/app/base/file";
import prisma from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { getType } from "../settings/types/actions";
import { getLocation } from "../settings/locations/actions";
import { getVendor } from "../settings/vendors/actions";
import { getStatus, getDefaultStatus } from "../settings/statuses/actions";
import { isValidDateFormat } from "@/lib/utils/datetime";
import { isValidPriceFormat } from "@/lib/utils/price";

var randomstring = require("randomstring");

async function readImage(formData: FormData){
  const file: File | null = formData.get("image") as unknown as File;
  var image_url;
  if (file) {
    image_url = await uploadFile(file);
  }
  
  return image_url;
}

function readName(formData: FormData) {
  const name = formData.get("name")?.toString();
  if (!name) {
    throw new Error("Name is required");
  }

  return name;
}

function readDesc(formData: FormData) {
  return formData.get("description")?.toString();
}

function readSerialNumber(formData: FormData) {
  return formData.get("serial_number")?.toString();
}

function readPurchasePrice(formData: FormData) {
  const purchase_price = formData.get("purchase_price")?.toString();

  if (!purchase_price) {
    throw new Error("Purchase price is required");
  }

  if (!isValidPriceFormat(purchase_price)) {
    throw new Error("Invalid price format");
  }

  return purchase_price;
}

function readActiveDate(formData: FormData) {
  var active_date = formData.get("active_date")?.toString();

  if (!active_date) {
    throw new Error("Active Date is required");
  }

  if (!isValidDateFormat(active_date)) {
    throw new Error("Active Date is wrong format");
  }

  return new Date(active_date);
}

function readCForm(formData: FormData) {
  const form = formData.get("form")?.toString();
  if (!form) {
    return;
  }
  return JSON.parse(form);
}

async function readType(formData: FormData) {
  const type_id = formData.get("type_id")?.toString();
  if (type_id) {
    const type = await getType(parseInt(type_id));
    if (!type) {
      throw new Error("This type is not exist");
    }
    return type;
  }

  throw new Error("Type is invalid");
}

async function readLocation(formData: FormData) {
  const location_id = formData.get("location_id")?.toString();
  if (location_id) {
    const location = await getLocation(parseInt(location_id));
    
    if(!location){
      throw new Error("This location is not exist");
    }

    return location;
  }

  throw new Error("Location is invalid");
}

async function readTag(formData: FormData){
  const tag_ids = formData.get("tag_ids")?.toString();
  if (!tag_ids) {
    return;
  }
  return JSON.parse(tag_ids);
}

async function readVendor(formData: FormData) {
  const vendor_id = formData.get("vendor_id")?.toString();
  if (vendor_id) {
    const vendor = await getVendor(parseInt(vendor_id));

    if(!vendor){
      throw new Error("This vendor is not exist");
    }

    return vendor;
  }

  throw new Error("Vendor is invalid");
}

async function readStatus(formData: FormData) {
  const status_id = formData.get("status_id")?.toString();
  var status;
  if (!status_id) {
    status = await getDefaultStatus()
  }else{
    status =  await getStatus(parseInt("status_id"));
  }

  if(!status){
    throw new Error("Status is not exist");
  }

  return status;
}

async function readCode(formData: FormData) {
  var code = formData.get("code")?.toString();
  if (code) {
    return code;
  }

  const type = await readType(formData);
  const rand = randomstring.generate({
    length: 12,
    charset: "alphabetic",
  });

  if (type) {
    return `${type.prefix}_${rand}`;
  }
  throw new Error("Invalid Code");
}

async function readData(formData: FormData) {
  const name = readName(formData);

  const description = readDesc(formData);

  const code = await readCode(formData);

  const tag_ids = await readTag(formData);

  const serial_number = readSerialNumber(formData);

  const type_id = await readType(formData).then((res) => {
    return res.id;
  });

  const location_id = await readLocation(formData).then((res) => {
    return res.id;
  });

  const vendor_id = await readVendor(formData).then((res) => {
    return res.id;
  });

  const status_id = await readStatus(formData).then((res) => {
    return res.id;
  });

  const active_date = readActiveDate(formData);

  const form = readCForm(formData);
  
  const image = await readImage(formData);


  const purchase_price = readPurchasePrice(formData);

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
    purchase_price,
  };
}

export async function getAssetById(id: number){
  return await prisma.assets.findUnique({
    where:{
      id: id
    }
  })
}

export async function getAllAssets(query: string | null = null){
  if(!query || query == ''){
    return await prisma.assets.findMany({
      orderBy:{id:'desc'}
    })
  }

  return await prisma.assets.findMany({
    orderBy:{id:'desc'},
    where:{
      name: {
        contains: query
      }
    }
  })
}

export async function addAsset(formData: FormData) {
  const data = await readData(formData);

  await prisma.assets.create({
    data: {
      name: data.name,
      description: data.description,
      code: data.code,
      tag_ids: data.tag_ids,
      serial_number: data.serial_number,
      type_id: data.type_id,
      location_id: data.location_id,
      vendor_id: data.vendor_id,
      status_id: data.status_id,
      active_date: data.active_date,
      image: data.image,
      form: data.form,
      purchase_price: data.purchase_price,
    },
  });

  revalidatePath("/assets");
}
