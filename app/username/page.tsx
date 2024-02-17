import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { registerUser } from "../../lib/actions";
import { isRegistered } from "@/lib/data";
import { Roboto } from "next/font/google";
import { SubmitButton } from "@/components/ui/submitButton";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"]
})

export default async function Page() {
  const user = await currentUser();
  if (!user) {
    redirect("/r");
  }
  const registered = await isRegistered(user.emailAddresses[0].emailAddress);
  if (registered) {
    redirect("/r");
  }
  const registerUserWithClerkID = registerUser.bind(null, user.id);
  return (
    <main className="flex flex-col gap-10 justify-center items-center w-screen h-screen">
      <h2 className={`text-5xl xl:text-6xl 2xl:text-7xl  ${roboto.className}`}>Create username</h2>
      <form action={registerUserWithClerkID} className="text-3xl xl:text-4xl 2xl:text-5xl border-4 border-green-900 rounded-xl p-6 2xl:p-12 flex flex-col gap-2 xl:gap-4 2xl:gap-5">
        <input name="email" type="text" value={user.emailAddresses[0].emailAddress} className=" bg-gray-950 border-2 rounded-l border-green-900 text-gray-600 cursor-no-drop px-4 py-3 2xl:px-6 2xl:py-5 focus:outline-none" required readOnly />
        <input name="username" type="text" placeholder="Username" maxLength={15} className=" bg-gray-950 border-2 rounded-l border-green-900 px-4 py-3 2xl:px-6 2xl:py-5 focus:outline-none focus:border-green-600" />
        <SubmitButton title="Confirm" className=" bg-green-900 px-4 py-3 2xl:px-6 2xl:py-5 rounded-l shadow-green-900 border-2 border-green-950 transition hover:scale-105 focus:outline-none focus:border-green-600" />
      </form>
    </main>
  )
}
