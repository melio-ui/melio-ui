import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex w-full">
          <nav className="shrink-0 z-[1300]">
            <div
              className="w-[260px] whitespace-nowrap box-border overflow-x-hidden shadow-none"
              style={{
                borderRight: '1px solid rgb(60, 60, 60)',
                transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
              }}
            >
              <div
                className="bg-black text-inherit overflow-y-auto flex flex-col h-full z-[1200] fixed top-0 left-0 outline-0 w-[260px] overflow-x-hidden shadow-none"
                style={{
                  borderRight: '1px solid rgb(60, 60, 60)',
                  transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                }}
              >
                <div className="grow h-full overflow-hidden p-5">
                  Components
                  <ul className="pt-5">
                    <li>
                      <Link href="/">Home</Link>
                    </li>

                    <li>
                      <Link href="/accordion">Accordion</Link>
                    </li>
                    <li>
                      <Link href="/avatar">Avatar</Link>
                    </li>
                    <li>
                      <Link href="/number-input">NumberInput</Link>
                    </li>
                    <li>
                      <Link href="/button">Button</Link>
                    </li>
                    <li>
                      <Link href="/input">Input</Link>
                    </li>
                    <li>
                      <Link href="/textarea">Textarea</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
          {/* <main className="flex min-h-screen flex-col items-center justify-between p-24"></main> */}
          <main className="w-full grow p-6">
            <div className="relative flex items-center px-6 py-2 min-h-[60px]" />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
