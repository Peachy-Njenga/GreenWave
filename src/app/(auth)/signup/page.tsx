import { Metadata } from "next"
import signUpImage from "@/assets/signup-image.jpg"
import Image from "next/image"
import Link from "next/link"
import SignUpForm from "./SignUpForm"

export const metadata: Metadata = {
    title: "Sign Up"
}

export default function Page() {
    return <main className="flex h-screen items-center justify-center p-5">
        <div className=" shadow-2xl flex h-full max-h-[40rem] max-w-[64rem] w-full rounded-xl overflow-hidden bg-card ">
            <div className="md:w-1/2 w-full space-y-10 overflow-y-auto p-10">
                <div className="space-y-1 text-center" >
                    <h1 className="text-3xl font-bold">Sign up to GreenWave</h1>
                    <p className="text-muted--foreground">
                        A place where even <span className="italic">you</span> can make a friend
                    </p>
                </div>
                <div className="space-y-5">
                    <SignUpForm />
                    <Link href="/login" className="block text-center hover:underline"></Link> 
                        Already have an account? Log in.
                </div>
            </div>
            <Image
                src={signUpImage}
                alt="image"
                className="w-1/2 hidden md:block object-cover" />
        </div>
    </main>
}
