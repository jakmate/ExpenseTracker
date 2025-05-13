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
            to='/budgets'
            className={`flex h-16 w-full items-center justify-center rounded px-4 transition-colors md:justify-start ${
              isActive('/budgets')
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
              <path d='M21 6.375c0 2.692-4.03 4.875-9 4.875S3 9.067 3 6.375 7.03 1.5 12 1.5s9 2.183 9 4.875z' />
              <path d='M12 12.75c2.685 0 5.19-.586 7.078-1.609a8.283 8.283 0 001.897-1.384c.016.121.025.244.025.368C21 12.817 16.97 15 12 15s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.285 8.285 0 001.897 1.384C6.809 12.164 9.315 12.75 12 12.75z' />
              <path d='M21 15.375c0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.213.01-.426.03-.636.196.629.5 1.213.895 1.731C4.68 17.061 8.128 18 12 18c3.872 0 7.32-.939 9.075-2.53.394-.518.698-1.102.894-1.73.021.21.031.423.031.636z' />
              <path d='M12 19.5c2.685 0 5.19-.586 7.078-1.609a8.282 8.282 0 001.897-1.384c.016.121.025.244.025.368 0 2.692-4.03 4.875-9 4.875s-9-2.183-9-4.875c0-.124.009-.247.025-.368a8.284 8.284 0 001.897 1.384C6.809 18.914 9.315 19.5 12 19.5z' />
            </svg>
            {isExpanded && <span className='ml-4 text-xl'>Budgets</span>}
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
              <path
                fillRule='evenodd'
                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z'
                clipRule='evenodd'
              />
            </svg>
            {isExpanded && <span className='ml-4 text-xl'>Income</span>}
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
              <path
                fillRule='evenodd'
                d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z'
                clipRule='evenodd'
              />
            </svg>
            {isExpanded && <span className='ml-4 text-xl'>Expenses</span>}
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
            </svg>
            {isExpanded && <span className='ml-4 text-xl'>Bank</span>}
          </Link>
        </nav>
      </div>

      <div className={`shrink-0 ${isExpanded ? 'w-64' : 'w-16'} transition-all duration-300`}></div>
    </>
  );
}
