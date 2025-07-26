"use client";
import { useState } from "react";
import { Menu, LogIn, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"; // Optional: for smooth animation

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="relative z-50 bg-white border-b border-gray-100 shadow-xl sticky top-0">
      <div className="flex items-center justify-between px-4 lg:px-10 py-4 lg:py-1">
        <Link className="flex items-center gap-2" href="/">
          <Image src="/Logo.png" alt="SuaraHati Logo" width={30} height={30} />
          <span className="text-3xl lg:text-4xl font-bold text-black">
            Suara<span className="text-[#ec616a]">Hati</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xl">
          <Link href="/" className="text-gray-700 font-bold hover-underline">
            Home
          </Link>
          <Link href="/journal" className="text-gray-700 font-bold hover-underline">
            Jurnal
          </Link>
          <Link href="#" className="text-gray-700 font-bold hover-underline">
            Konsultasi
          </Link>
          <div className="btn-style1 rounded-xl p-2 border-2 font-bold flex items-center gap-2">
            <Link href="/auth">Masuk</Link>
            <LogIn className="w-3 h-3" />
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg border border-gray-300 btn-style2"
          aria-label="Menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden flex flex-col px-4 pt-2 pb-4 bg-white shadow-lg border-t border-gray-100"
          >
            <Link href="/" className="py-2 text-gray-700 font-bold border-b" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/journal" className="py-2 text-gray-700 font-bold border-b" onClick={toggleMenu}>
              Jurnal
            </Link>
            <Link href="#" className="py-2 text-gray-700 font-bold border-b" onClick={toggleMenu}>
              Konsultasi
            </Link>
            <Link
              href="/auth"
              className="mt-2 btn-style1 rounded-xl p-2 border-2 font-bold flex items-center gap-2 w-fit"
              onClick={toggleMenu}
            >
              Masuk
              <LogIn className="w-3 h-3" />
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
