"use client";

import { useEffect, useState } from "react";
import supabase from "@/lib/supabaseClient";
import Landing from "@/components/page/landing";
import Dashboard from "@/components/page/dashboard";
import { User } from "@supabase/supabase-js"; // pastikan import ini ada

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (user && !error) {
        setUser(user);
      }

    };

    getUser();
  }, []);



  return user ? <Dashboard user={user} /> : <Landing />;
}
