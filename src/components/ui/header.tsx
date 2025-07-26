import {  LogIn } from "lucide-react"
import Image from "next/image"

export default function Header() {
    return (
      <header className="flex items-center justify-between px-10 py-1 bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xl">
        <a className="flex items-center gap-2" href="/">
          <Image src="/Logo.png" alt="SuaraHati Logo" width={30} height={30} className="w-full h-auto" />
          <span className="text-4xl font-bold text-black">
            Suara<span className="text-[#ec616a]">Hati</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-xl">
          <a href="#" className="text-gray-700 font-bold hover-underline">
            Home
          </a>
          <a href="/journal" className="text-gray-700 font-bold hover-underline">
            Jurnal
          </a>
          <a href="#" className="text-gray-700 font-bold hover-underline">
            Konsultasi
          </a>
          <div className="btn-style1 rounded-xl p-2 border-2 font-bold flex items-center gap-2">
            <a href="/auth" className=" ">
              Masuk
            </a>
            <LogIn className="w-3 h-3"/>
          </div>

        </nav>
      </header>
    )
}