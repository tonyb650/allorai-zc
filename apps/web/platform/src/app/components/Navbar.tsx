import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import Logo from './Logo';
import { Button, Dialogue } from '@allorai/shared-ui';
import { StartOver } from './modals/StartOver';
import { deleteChatSession } from '../api/chat';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const navigation = [{ name: 'My Trips', href: '/itineraries' }];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { user } = useAuth();

  const handleGoogleLogin = async () => {
    localStorage.setItem('loginRedirectPath', window.location.pathname + window.location.search);
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <nav className="bg-white border-b border-black shadow-md text-primary fixed z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo width={125} />
          </Link>

          <div className="flex space-x-4">
            <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
              New Trip
            </Button>
            <Dialogue
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              title="Start Over"
              className={clsx('max-w-sm')}
            >
              <StartOver
                onClose={() => setIsDialogOpen(false)}
                onReset={async () => {
                  try {
                    await deleteChatSession();
                  } catch {
                    console.error('No active session to clear - continuing with reset');
                  } finally {
                    setIsDialogOpen(false);
                    navigate('/');
                  }
                }}
              />
            </Dialogue>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const isDisabled = item.href === '/itineraries' && !user;

              if (isDisabled) {
                return (
                  <span
                    key={item.name}
                    className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-gray-400 cursor-not-allowed"
                    title="Log in to view your trips"
                  >
                    <span>{item.name}</span>
                  </span>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={clsx(
                    'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-[#002e9a] hover:bg-gray-100 hover:text-gray-900',
                  )}
                >
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {user ? (
              <Button
                variant="secondary"
                onClick={async () => {
                  await supabase.auth.signOut();
                  navigate('/landing');
                }}
              >
                Log Out - {user.email?.substring(0, 1)}
              </Button>
            ) : (
              <>
                <Button variant="secondary" onClick={handleGoogleLogin}>
                  Log In
                </Button>

                {/* <Link
                to="/login"
                className={clsx(
                  'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  location.pathname === '/login'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-[#002e9a] hover:bg-gray-100 hover:text-gray-900',
                )}
              >
                <span>Log In</span>
              </Link>
              */}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
