'use client'
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UserButton, UserProfile } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export default function Navbar() {
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

        {/* Nav Links */}
        <div className={`${menuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto`} id="navbar-default">
          <ul className="flex flex-col mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
               <Link href="/dashboard" className={`block py-2 px-3  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                ${path === '/dashboard' ? ' md:bg-transparent md:text-blue-700 font-bold' : 'text-gray-700'}`
              }>Dashboard</Link>
            </li>
            <li>
               <Link href='/dashboard/notes' className={`block py-2 px-3  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                ${path === '/dashboard/notes' ? ' md:bg-transparent md:text-blue-700 font-bold' : 'text-gray-700'}`
              }>Notes</Link>
            </li>
            {/* <li>
               <Link href="/" className={`block py-2 px-3  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                ${path === '/dashboard/upgrade' ? ' md:bg-transparent md:text-blue-700 font-bold' : 'text-gray-700'}`
              }>Upgrade</Link>
            </li>
            <li>
               <Link href="/" className={`block py-2 px-3  hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500
                ${path === '/dashboard/how-it-works' ? ' md:bg-transparent md:text-blue-700 font-bold' : 'text-gray-700'}`
              }>How it works</Link>
            </li> */}
            
          </ul>
        </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <UserButton />
          </div>
      </div>
    </nav>
  );
}


