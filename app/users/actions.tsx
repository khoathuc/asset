"use server";
import prisma from "@/lib/db/prisma";
import { users } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { User } from "@/models/user/user";
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

export async function getAllUsers(query: string | null = null) {
  return await User.loader().all();
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
  } = await User.reader(formData).read();

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

  revalidatePath("/users");
}

export async function editUser(formData: FormData) {
  const id = parseInt(formData.get("id")?.toString() ?? "");
  const user = await User.loader().getById(id);
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
  } = await User.reader(formData).read();

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