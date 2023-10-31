import prisma from "@/lib/db/prisma";
import { locations } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    const {name, description, address, file} = data;

    const location = await prisma.locations.create({
      data: {
        name,
        description,
        address,
        image: file,
        status: true,
      },
    });

    return new Response(JSON.stringify(location));
  } catch (error) {
    console.log("erorr", error)
    return new Response("Server error", {status: 500})
  }
}
