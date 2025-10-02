'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export default function NavbarCourse() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  useEffect(() => {

  }, [path])

  return (
    <nav className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 bakground-secondary shadow-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
   
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/logo.svg" alt="Job Botics Logo" width={36} height={36} />
          <span className="text-2xl font-bold whitespace-nowrap dark:text-white">Job Botics</span>
        </Link>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          aria-controls="navbar-default"
          aria-expanded={menuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        
          <div className="hidden md:flex md:items-center md:space-x-6">
            <UserButton />
          </div>
      </div>
    </nav>
  );
}


