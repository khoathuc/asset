"use server";
import prisma from "@/lib/db/prisma";
import { users } from "@prisma/client";
import { uploadFile } from "../base/file";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
interface UserData {
  first_name: string;
  last_name: string;
  activated: boolean;
  country: string | undefined;
  avatar: string | undefined;
  phone: string | undefined;
  job_title: string | undefined;
  username: string;
  description: string | undefined;
  city: string | undefined;
  state: string | undefined;
  password?: string; // Make 'password' optional, as it's conditionally added
}

async function readData(formData: FormData) {
  const description = formData.get("description")?.toString();
  const phone = formData.get("phone")?.toString();
  const job_title = formData.get("job_title")?.toString();
  const address = formData.get("address")?.toString();
  const city = formData.get("city")?.toString();
  const country = formData.get("country")?.toString();
  const state = formData.get("state")?.toString();

  const avatar_url = await readFile(formData);
  const first_name = readFirstName(formData);
  const last_name = readLastName(formData);

  var email = null;
  if(formData.get("email")){
    email = await readEmail(formData);
  }
  const username = readUsername(formData);

  var hashedPassword = null;
  if (formData.get("password")) {
    hashedPassword = await readPassword(formData);
  }

  return {
    first_name,
    last_name,
    email,
    hashedPassword,
    country,
    avatar_url,
    phone,
    job_title,
    address,
    username,
    description,
    city,
    state,
  };
}

async function readPassword(formData: FormData) {
  const password = formData.get("password")?.toString();
  if (!password) {
    throw new Error("Password is required");
  }

  const hashedPassword = bcrypt.hash(password, 10);
  return hashedPassword;
}

async function readEmail(formData: FormData) {
  const email = formData.get("email")?.toString();
  if (!email) {
    throw new Error("Email is required");
  }

  const user = await prisma.users.findUnique({
    where: { email: email },
  });

  if (user) {
    throw new Error("Email is existed");
  }

  return email;
}

function readUsername(formData: FormData) {
  const username = formData.get("username")?.toString();
  if (!username) {
    throw new Error("Username is required");
  }

  return username;
}

function readFirstName(formData: FormData) {
  const first_name = formData.get("first_name")?.toString();
  if (!first_name) {
    throw new Error("First name is required");
  }

  return first_name;
}

function readLastName(formData: FormData) {
  const last_name = formData.get("last_name")?.toString();
  if (!last_name) {
    throw new Error("Last name is required");
  }

  return last_name;
}

async function readFile(formData: FormData) {
  const avatar: File | null = formData.get("avatar") as unknown as File;
  var avatar_url;
  if (avatar) {
    avatar_url = await uploadFile(avatar);
  }

  return avatar_url;
}

export async function getAllUsers(query: string | null = null) {
  if (!query || query === "") {
    return await prisma.users.findMany({
      orderBy: { id: "desc" },
    });
  }

  return await prisma.users.findMany({
    orderBy: { id: "desc" },
    where: {
      username: {
        contains: query,
      },
    },
  });
}

export async function changeStatus(checked: boolean, user: users) {
  if (!user) {
    throw Error("User is invalid");
  }

  return await prisma.users.update({
    where: {
      id: user.id,
    },
    data: {
      activated: checked,
    },
  });
}

export async function addUser(formData: FormData) {
  const {
    first_name,
    last_name,
    email,
    hashedPassword,
    country,
    avatar_url,
    phone,
    job_title,
    username,
    description,
    city,
    state,
  } = await readData(formData);

  await prisma.users.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      activated: true,
      country,
      avatar: avatar_url,
      phone,
      job_title,
      username,
      description,
      city,
      state,
    },
  });
}

export async function editUser(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("Invalid user");
  }
  const {
    first_name,
    last_name,
    hashedPassword,
    country,
    avatar_url,
    phone,
    job_title,
    username,
    description,
    city,
    state,
  } = await readData(formData);

  var data:UserData = {
    first_name,
    last_name,
    activated: true,
    country,
    avatar: avatar_url,
    phone,
    job_title,
    username,
    description,
    city,
    state,
  };

  if (hashedPassword) {
    data = {...data, password: hashedPassword}
  }

  await prisma.users.update({
    where: {
      id: id,
    },
    data: data,
  });

  revalidatePath("/users");
}