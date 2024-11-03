'use client';

/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/lJwnQlHSEBA
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JSX, SVGProps } from 'react';
import { useConvexAuth } from 'convex/react';
import { useAuthActions } from '@convex-dev/auth/react';

export function NavBarComponent() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  const onLoginClick = () => {
    isAuthenticated ? signOut() : router.push('/login');
  };

  return (
    <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden ml-auto">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <Link href="/" className="mr-6 hidden lg:flex" prefetch={false}>
            <img
              src="https://centrumstocznia.com/wp-content/uploads/800x800-1.png"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="sr-only">centrumstocznia</span>
          </Link>
          <div className="grid gap-2 py-6">
            <Link
              href="/"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              <SheetClose>Zapisy</SheetClose>
            </Link>
            <Link
              href="/about"
              className="flex w-full items-center py-2 text-lg font-semibold"
              prefetch={false}
            >
              <SheetClose>Info i Mapa dojazdu</SheetClose>
            </Link>
            <SheetClose className="w-full">
              <div>
                {isLoading ? (
                  <div className="flex justify-center w-full py-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500" />
                  </div>
                ) : (
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full"
                    onClick={onLoginClick}
                  >
                    {isAuthenticated ? 'Logout' : 'Login'}
                  </Button>
                )}
              </div>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="#" className="mr-6 hidden lg:flex" prefetch={false}>
        <img
          src="https://centrumstocznia.com/wp-content/uploads/800x800-1.png"
          alt="Logo"
          className="h-8 w-auto"
        />
        <span className="sr-only">centrumstocznia</span>
      </Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        <Link
          href="/"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Zapisy
        </Link>
        <Link
          href="/about"
          className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
          prefetch={false}
        >
          Info i Mapa dojazdu
        </Link>

        <div>
          {isLoading ? (
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white w-full"
              disabled
            >
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white-500" />
            </Button>
          ) : (
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={onLoginClick}
            >
              {isAuthenticated ? 'Logout' : 'Login'}
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
