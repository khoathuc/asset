"use client"
import Edit from "@/public/edit.svg";
import {Modal} from "@/components/layout/Modal";
import { tags } from "@prisma/client";
import { EditForm } from "./Form";

export default function EditButton({tag}:{tag: tags}){
    function handleClick(){
        Modal.initModal(<EditForm tag={tag}/>, ()=>{
            Modal.openModal()
        })
    }

    return (
        <>
            <button onClick={handleClick}>
                <Edit className="h-4 w-4"></Edit>
                Edit Tag
            </button>
        </>
    )
}