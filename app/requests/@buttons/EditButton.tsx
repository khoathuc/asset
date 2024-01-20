'use client'
import React, { useState } from "react";
import { requests } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "../@form/EditForm";

export default function EditButton({request}:{request: requests}){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button>
                <Edit className='h-4 -4' />
                Edit requests
            </button>
            {showModal && Modal.initModal(<EditForm request={request} onClose={()=> setShowModal(false)} />)}
        </>
    )
}