import { Link } from 'react-router-dom'

export function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-20
                          flex flex-col z-10
                          bg-gray-800 text-white shadow-lg">
      <nav className="h-full flex flex-col justify-center space-y-8">
        <Link
          to="/"
          className="w-full text-center rounded hover:bg-gray-700 transition-colors"
        >
          <span className="text-xs mt-5 block">Dashboard</span>
        </Link>
        <Link
          to="/expenses"
          className="w-full text-center rounded hover:bg-gray-700 transition-colors"
        >
          <span className="text-xs mt-5 block">Expenses</span>
        </Link>
        <Link
          to="/incomes"
          className="w-full text-center rounded hover:bg-gray-700 transition-colors"
        >
          <span className="text-xs mt-5 block">Income</span>
        </Link>
        <Link
          to="/bank"
          className="w-full text-center rounded hover:bg-gray-700 transition-colors"
        >
          <span className="text-xs mt-5 block">Bank</span>
        </Link>
      </nav>
    </div>
  )
}