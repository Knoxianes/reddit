import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Search(){
  return(
    <div className="w-full h-3/4 bg-gray-900 rounded-3xl flex flex-row gap-2">
      <div className="rounded-3xl flex justify-center items-center px-4">
        <FaMagnifyingGlass className=""/>
      </div>
      <input type="text" placeholder="Search..." className="w-full bg-gray-900 rounded-3xl focus:outline-none text-3xl py-1"/>
    </div>
  )
}
