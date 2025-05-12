import Link from 'next/link';
import Image from 'next/image';
import { useAuthContext } from '../lib/AuthContext';

export default function Navbar() {
  const { user, loading, signInWithGoogle, logout } = useAuthContext();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="font-bold text-xl text-indigo-600">
                GS Tennis Predictor
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/tournaments" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Tournaments
              </Link>
              <Link 
                href="/predictions" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                My Predictions
              </Link>
              <Link 
                href="/leaderboard" 
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Leaderboard
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {!loading && (
              user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {user.photoURL && (
                      <Image 
                        src={user.photoURL} 
                        alt={user.displayName || 'User'} 
                        width={32} 
                        height={32} 
                        className="rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium text-gray-700">{user.displayName}</span>
                  </div>
                  <button
                    onClick={() => logout()}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signInWithGoogle()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign In with Google
                </button>
              )
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link 
            href="/tournaments" 
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Tournaments
          </Link>
          <Link 
            href="/predictions" 
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            My Predictions
          </Link>
          <Link 
            href="/leaderboard" 
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Leaderboard
          </Link>
        </div>
      </div>
    </nav>
  );
} 