import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Search from "./search";
import Profile from "./profile";

const font = Poppins({
    weight: "500",
    subsets: ['latin']

})

export function Navbar() {
    return (
        <div className={`${font.className} bg-gray-950 text-4xl grid grid-cols-12 justify-center items-center w-full sticky top-0  left-0 border-b-2 border-green-700 border-opacity-80 px-4 pt-3 pb-5 z-50`}>
            <div className="h-24 hidden w-full md:flex md:items-center md:justify-start transition hover:translate-y-0.5">
                <Link href={"/r"}><Image src={"/logo.png"} alt="logo" width={70} height={40} /></Link>
            </div>
            <Link href={{pathname: "/r", query:{feed:"home"}}} className="w-full font-bold cursor-pointer transition hover:translate-y-0.5 flex items-center justify-center">
                HOME
            </Link>
            <div className="col-span-3 md:col-span-8 w-full h-full flex justify-center items-center">
                <Search />
            </div>
            <Link href={{pathname: "/r", query:{feed:"explore"}}} className="font-bold cursor-pointer transition hover:translate-y-0.5 flex items-center justify-end  w-full">
                EXPLORE
            </Link>
            <div className="w-full flex justify-end items-center ">
                <Profile />
            </div>
        </div>
    )
}
