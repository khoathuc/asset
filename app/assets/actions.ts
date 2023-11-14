"use server";

import { uploadFile } from "@/app/base/file";
import prisma from "@/lib/db/prisma";
import { assets } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { getType } from "../settings/types/actions";
import { getLocation } from "../settings/locations/actions";
import { getVendor } from "../settings/vendors/actions";
import { getStatus } from "../settings/statuses/actions";
var randomstring = require("randomstring");

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

function readSerialNumber(formData: FormData){
    return formData.get('serial_number')?.toString();
}

async function readType(formData: FormData) {
  const type_id = formData.get("type_id")?.toString();
  if (type_id) {
    return await getType(parseInt(type_id));
  }

  throw new Error("Type is invalid")
}

async function readLocation(formData: FormData) {
  const location_id = formData.get("location_id")?.toString();
  if (location_id) {
    return await getLocation(parseInt(location_id));
  }

  throw new Error("Location is invalid")
}


async function readVendor(formData: FormData) {
  const vendor_id = formData.get("vendor_id")?.toString();
  if (vendor_id) {
    return await getVendor(parseInt(vendor_id));
  }

  throw new Error("Vendor is invalid")
}


async function readStatus(formData: FormData){
    const status_id = formData.get("status_id")?.toString();
    if(status_id){
        return await getStatus(parseInt("status_id"));
    }

    throw new Error("Status is invalid");
}


async function readCode(formData: FormData) {
  var code = formData.get("code")?.toString();
  if (!code) {
    const type = await readType(formData);
    const rand = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });

    if (type) {
      return `${type.prefix}_${rand}`;
    }
  }
}

async function readData(formData: FormData) {
  const name = readName(formData);
  const description = readDesc(formData);
  const code = await readCode(formData);
  const serial_number = readSerialNumber(formData);
  const type_id = readType(formData);
  const location_id = readLocation(formData);
  const vendor_id = readVendor(formData);
  const status_id = readStatus(formData);
  const active_date = readActiveDate(formData);
  const form = readForm(formData);
  const purchase_price = readPurchasePrice(formData);

  return {
    name,
    description,
    code,
    serial_number,
    type_id,
    location_id,
    vendor_id,
    status_id,
    active_date,
    form,
    purchase_price,
  };
}

export async function addAsset(formData: FormData) {
  const data = readData(formData);

  await prisma.assets.create({
    data: {
      name: data.name,
      description: data.description,
      code: data.code,
      serial_number: data.serial_number,
      type_id: data.type_id,
      location_id: data.location_id,
      vendor_id: data.vendor_id,
      status_id: data.status_id,
      active_date: data.active_date,
      form: data.form,
      purchase_price: data.purchase_price,
    },
  });

  revalidatePath("/assets");
}
