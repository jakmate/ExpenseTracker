import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <div
        className={`fixed left-0 top-0 z-10 flex h-screen flex-col bg-blue-900 text-white shadow-lg transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
      >
        <button
          onClick={toggleSidebar}
          className='absolute -right-3 top-10 rounded-full bg-white p-1 text-blue-900 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
          aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isExpanded ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-6'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path
                d='M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z'
                fillRule='evenodd'
                clipRule='evenodd'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-6'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path
                d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                fillRule='evenodd'
                clipRule='evenodd'
              />
            </svg>
          )}
        </button>

        <nav className='flex h-full flex-col justify-center space-y-8'>
          <Link
            to='/'
            className={`flex h-16 w-full items-center justify-center rounded px-4 transition-colors md:justify-start ${
              isActive('/')
                ? 'bg-white font-semibold text-blue-900'
                : 'text-white hover:bg-blue-800'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-6 shrink-0'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z' />
              <path d='M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z' />
            </svg>
            {isExpanded && <span className='ml-4 text-xl'>Dashboard</span>}
          </Link>

          <Link
            to='/expenses'
            className={`flex h-16 w-full items-center justify-center rounded px-4 transition-colors md:justify-start ${
              isActive('/expenses')
                ? 'bg-white font-semibold text-blue-900'
                : 'text-white hover:bg-blue-800'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-6 shrink-0'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z' />
              <path
                fillRule='evenodd'
                d='M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z'
                clipRule='evenodd'
              />
              <path d='M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z' />
            </svg>
            {isExpanded && <span className='ml-4 text-xl'>Expenses</span>}
          </Link>

          <Link
            to='/incomes'
            className={`flex h-16 w-full items-center justify-center rounded px-4 transition-colors md:justify-start ${
              isActive('/incomes')
                ? 'bg-white font-semibold text-blue-900'
                : 'text-white hover:bg-blue-800'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-6 shrink-0'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z' />
              <path
                fillRule='evenodd'
                d='M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z'
                clipRule='evenodd'
              />
              <path d='M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z' />
              <path
                d='M15 12.75l-3-3m0 0l-3 3m3-3v7.5'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            {isExpanded && <span className='ml-4 text-xl'>Income</span>}
          </Link>

          <Link
            to='/bank'
            className={`flex h-16 w-full items-center justify-center rounded px-4 transition-colors md:justify-start ${
              isActive('/bank')
                ? 'bg-white font-semibold text-blue-900'
                : 'text-white hover:bg-blue-800'
            }`}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='size-6 shrink-0'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z' />
              <path
                fillRule='evenodd'
                d='M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z'
                clipRule='evenodd'
              />
              <path d='M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z' />
            </svg>
            {isExpanded && <span className='ml-4 text-xl'>Bank</span>}
          </Link>
        </nav>
      </div>

      <div className={`shrink-0 ${isExpanded ? 'w-64' : 'w-16'} transition-all duration-300`}></div>
    </>
  );
}
