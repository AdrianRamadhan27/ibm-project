import {  LogIn } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
    return (
      <header className="flex items-center justify-between px-10 py-1 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xl">
        <Link className="flex items-center gap-2" href="/">
          <Image src="/Logo.png" alt="SuaraHati Logo" width={30} height={30} className="w-full h-auto" />
          <span className="text-3xl lg:text-4xl font-bold text-black">
            Suara<span className="text-[#ec616a]">Hati</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xl">
          <Link href="#" className="text-gray-700 font-bold hover-underline">
            Home
          </Link>
          <Link href="/journal" className="text-gray-700 font-bold hover-underline">
            Jurnal
          </Link>
          <Link href="#" className="text-gray-700 font-bold hover-underline">
            Konsultasi
          </Link>
          <div className="btn-style1 rounded-xl p-2 border-2 font-bold flex items-center gap-2">
            <Link href="/auth" className=" ">
              Masuk
            </Link>
            <LogIn className="w-3 h-3"/>
          </div>

        </nav>
      </header>
    )
}