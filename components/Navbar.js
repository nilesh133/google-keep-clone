import React, {useEffect, useRef, useState} from 'react';
import { AiOutlineBulb } from "react-icons/ai";
import {BiArchiveIn} from "react-icons/bi";
import {FiTrash2} from "react-icons/fi"
import { useRouter } from 'next/router';
const Navbar = () => {
    const router = useRouter();
    console.log(router.pathname);

    const notesBgPush = () => {
        router.push("/");
    }

    const archiveBgPush = () => {
        router.push("/archived")
    }

    const deleteBgPush = () => {
        router.push("/deleted")
    }
    
    return (
        <div className='py-3 mb-10 border-b-2 md:border-0'>

            <ul>
                <li onClick = {() => notesBgPush()} className={"flex items-center cursor-pointer pl-8 pr-24 py-4 rounded-r-full hover:bg-gray-100" + (router.pathname === "/" ? " bg-[#F4B400] hover:bg-[#F4B400]" : " bg-white")}>
                    <AiOutlineBulb className='w-6 h-6 mr-8 text-gray-800' />
                    <p className='font-semibold text-gray-800'>Notes</p>
                </li>
                <li onClick = {() => archiveBgPush()} className={"flex items-center cursor-pointer pl-8 pr-24 py-4 rounded-r-full hover:bg-gray-100" + (router.pathname === "/archived" ? " bg-[#F4B400] hover:bg-[#F4B400]" : " bg-white")}>
                    <BiArchiveIn className='w-6 h-6 mr-8 text-gray-800' />
                    <p className='font-semibold text-gray-800'>Archive</p>
                </li>
                <li onClick = {() => deleteBgPush()} className={"flex items-center cursor-pointer pl-8 pr-24 py-4 rounded-r-full hover:bg-gray-100" + (router.pathname === "/deleted" ? " bg-[#F4B400] hover:bg-[#F4B400]" : " bg-white")}>
                    <FiTrash2 className='w-6 h-6 mr-8 text-gray-800' />
                    <p className='font-semibold text-gray-800'>Trash</p>
                </li>
            </ul>
        </div>
    )
}

export default Navbar