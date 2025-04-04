"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import Link from "next/link";
import { ModeToggle } from "@/components/theme-toggle";
import AlgoliaSearch from "@/components/algolia-search";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-transparent shadow-none">
      {/* Left Section: Logo */}
      <div className="text-lg font-bold text-black dark:text-white">
        AriaDocs
      </div>

      {/* Middle Section: Algolia Search */}
      <div className="flex-1 mx-4 max-w-md">
        <AlgoliaSearch
          appId="YOUR_ALGOLIA_APP_ID"
          indexName="YOUR_ALGOLIA_INDEX_NAME"
          apiKey="YOUR_ALGOLIA_API_KEY"
        />
      </div>

      {/* Right Section: Mode Toggle + Auth Buttons */}
      <div className="flex items-center space-x-4">
        <ModeToggle />

        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition"
          >
            Logout
          </button>
        ) : (
          <Link href="/login">
            <button className="px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 transition">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
