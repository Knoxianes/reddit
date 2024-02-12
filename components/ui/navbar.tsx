'use client';
import { FaGripLines } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Search from "./search";
import Profile from "./profile";

const font = Poppins({
    weight: "500",
    subsets: ['latin']

})
export function  Navbar() {
    return (
        <div className={`${font.className} text-4xl grid grid-cols-5 md:grid-cols-12 justify-center items-center w-full sticky top-0  left-0 border-b-2 border-green-700 px-4 py-1`}>
            <div className="h-24 hidden w-full md:flex md:items-center md:justify-start transition hover:translate-y-0.5">
                <Link href={"/r"}><Image src={"/logo.png"} alt="logo" width={70} height={40} /></Link>
            </div>
            <div className=" md:hidden w-full flex items-center justify-start">
                <FaGripLines />
            </div>
            <div className="hidden cursor-pointer transition hover:translate-y-0.5 md:flex items-center justify-start w-full">
                Home
            </div>
            <div className="col-span-3 md:col-span-8 w-full">
                <Search/>
            </div>
            <div className="hidden cursor-pointer transition hover:translate-y-0.5 md:flex items-center justify-end  w-full">
                Explore
            </div>
            <div className="w-full flex justify-end items-center ">
                <Profile />
            </div>
        </div>
    )
}
