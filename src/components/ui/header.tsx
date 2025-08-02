"use client"

import { useEffect, useState, useRef } from "react";
import { Menu, LogIn, X, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import supabase from "@/lib/supabaseClient";
import { User } from '@supabase/supabase-js'
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (!confirmLogout) return;

    await supabase.auth.signOut();
    router.refresh()
    window.location.reload(); 
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const fullName = user?.user_metadata?.full_name || user?.email || "User";
  const userName = fullName.split(" ").slice(0, 2).join(" ");
  const userInitial = userName[0]?.toUpperCase() || "U";

  return (
    <header className="z-50 bg-white border-b border-gray-100 shadow-xl sticky top-0">
      <div className="flex items-center justify-between px-4 lg:px-10 py-4 lg:py-1">
        <Link className="flex items-center gap-2" href="/">
          <Image src="/Logo.png" alt="SuaraHati Logo" width={30} height={30} />
          <span className="text-3xl lg:text-4xl font-bold text-black">
            Suara<span className="text-[#ec616a]">Hati</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xl relative">
          <Link href="/" className="text-gray-700 font-bold hover-underline">Home</Link>
          <Link href="/journal" className="text-gray-700 font-bold hover-underline">Jurnal</Link>
          <Link href="/consult" className="text-gray-700 font-bold hover-underline">Konsultasi</Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-2 border-2 p-2 rounded-xl font-bold">
                <div className="w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center">
                  {userInitial}
                </div>
                <span className="text-sm">{userName}</span>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="hover:cursor-pointer transition-transform"
                >
                  {dropdownOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    key="dropdown"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50 overflow-hidden text-sm"
                  >
                    <Link
                      href="/profile"
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profil Saya
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 hover:cursor-pointer"
                    >
                      Keluar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/auth" className="btn-style1 rounded-xl p-2 border-2 font-bold flex items-center gap-2">
              Masuk <LogIn className="w-3 h-3" />
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg border border-gray-300 btn-style2 hover:cursor-pointer"
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
            <Link href="/" className="py-2 text-gray-700 font-bold border-b" onClick={toggleMenu}>Home</Link>
            <Link href="/journal" className="py-2 text-gray-700 font-bold border-b" onClick={toggleMenu}>Jurnal</Link>
            <Link href="/consult" className="py-2 text-gray-700 font-bold border-b" onClick={toggleMenu}>Konsultasi</Link>

            {user ? (
              <>
                <div className="py-2 px-2 text-left text-sm font-semibold">{userName}</div>
                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="text-left w-full text-red-600 px-4 py-2 hover:bg-gray-100"
                >
                  Keluar
                </button>
              </>
            ) : (
              <Link
                href="/auth"
                className="mt-2 btn-style1 rounded-xl p-2 border-2 font-bold flex items-center gap-2 w-fit"
                onClick={toggleMenu}
              >
                Masuk <LogIn className="w-3 h-3" />
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
