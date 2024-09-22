import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";



export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await validateRequest();

    // redirect returns never by default, so nothing below it will be rendered if we get redirected, 
    // if one tries to access the pages in this main folder and isn't logged in, they can be redirected. not for security but for UX
    if (!session.user) redirect("/login");

    // makes the session available to al the client components
    return (<SessionProvider value={session}>
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <div className="mx-auto max-w-7xl p-5 flex w-full grow gap-5">
                <MenuBar className="sticky top-[5.25rem] h-fit hidden xl:w-80 flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5" />
                {children}
            </div>
            <MenuBar className="sticky bottom-0 flex w-full justify-center gap-5 border-t bg-card p-3 sm:hidden "/>
        </div>
    </SessionProvider>)

}