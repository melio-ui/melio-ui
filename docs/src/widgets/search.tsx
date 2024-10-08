'use client';

import { useEffect, useState } from 'react';

import SearchDialog from './search-dialog';

export default function Search() {
  const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      !searchDialogOpen && event.preventDefault();
      if (event.key === '/') {
        setSearchDialogOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchDialogOpen]);

  return (
    <div className="ml-4 grow md:ml-8">
      <button
        className="inline-flex w-full items-center justify-between whitespace-nowrap rounded border border-slate-200 bg-white py-[7px] pl-3 pr-2 text-[15px] leading-5 text-slate-400 shadow-sm hover:border-slate-300 sm:w-[380px] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 dark:hover:border-slate-600"
        onClick={() => {
          setSearchDialogOpen(true);
        }}
      >
        <div className="flex items-center justify-center">
          <svg
            className="mr-3 h-4 w-4 shrink-0 fill-slate-500 dark:fill-slate-400"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m14.707 13.293-1.414 1.414-2.4-2.4 1.414-1.414 2.4 2.4ZM6.8 12.6A5.8 5.8 0 1 1 6.8 1a5.8 5.8 0 0 1 0 11.6Zm0-2a3.8 3.8 0 1 0 0-7.6 3.8 3.8 0 0 0 0 7.6Z" />
          </svg>
          <span>
            Search<span className="hidden sm:inline"> for anything</span>…
          </span>
        </div>
        <div className="ml-3 flex h-5 w-5 items-center justify-center rounded border border-slate-200 font-medium text-slate-500 shadow-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-400">
          /
        </div>
      </button>
      <div>
        <SearchDialog isOpen={searchDialogOpen} setIsOpen={setSearchDialogOpen} />
      </div>
    </div>
  );
}
