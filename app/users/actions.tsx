"use server";
import prisma from "@/lib/db/prisma";
import { users } from "@prisma/client";

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


export async function addUser(formData: FormData){
  const {first_name, last_name, email, country, avatar_url, phone, job_title, username, description, city, state} = await readData(formData);

  await prisma.users.create({
    data:{
      first_name,
      last_name,
      email,
      country,
      avatar: avatar_url,
      phone,
      job_title,
      username,
      description,
      city,
      state
    }
  })
}