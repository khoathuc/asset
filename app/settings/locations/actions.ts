"use server";

import { writeFile } from "fs/promises";
import { join } from "path";

export async function addLocation(formData: FormData){
    const file:File | null = formData.get('file') as unknown as File;
    if(!file){
        throw new Error('No file uploaded')
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    console.log(process.cwd())
    const path = join(process.cwd(),'/public/upload', file.name);
    console.log(`open ${path} to see the uploaded file`)
    await writeFile(path, buffer);
    
    return {success:true}
}