import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";

export default async function Profile() {
  const user = await currentUser();
  if (user) {
    return (
      <Link href={"/profile"} className="flex items-center justify-center h-20 w-20 text-3xl rounded-full bg-gray-900 transition translate-y-0.5 cursor-pointer">
        PF
      </Link>      
    )
  }
  return (
    <Link href={"/sign-in"} className="transition cursor-pointer hover:translate-y-0.5">
      <CgProfile className="h-20 w-20" />
    </Link>
  )

}
