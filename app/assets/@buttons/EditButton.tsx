'use client'
import React, { useState } from "react";
import { assets } from "@prisma/client";
import { Modal } from "@/components/layout/Modal";
import Edit from "@/public/edit.svg";
import { EditForm } from "../@form/Form";

export default function EditButton({asset}:{asset: assets}){
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button>
                <Edit className='h-4 -4' />
                Edit Asset
            </button>
            {showModal && Modal.initModal(<EditForm asset={asset} onClose={()=> setShowModal(false)} />)}
        </>
    )
}