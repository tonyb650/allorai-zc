import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import Logo from './Logo';
import { Button, Dialogue } from '@allorai/shared-ui';
import { StartOver } from './modals/StartOver';
import { deleteChatSession } from '../api/chat';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const navigation = [
  { name: 'Chat', href: '/chat' },
  { name: 'Itineraries', href: '/itineraries' },
  { name: 'Explore', href: '/explore' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <nav className="bg-white border-b border-black shadow-md text-[#002e9a]">
      <div className="max-w-7xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo width={125} />
          </Link>

          <div className="flex space-x-4">
            <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
              Start Over
            </Button>
            <Dialogue
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              title="Start Over"
            >
              <StartOver
                onClose={() => setIsDialogOpen(false)}
                onReset={async () => {
                  try {
                    await deleteChatSession();
                  } catch {
                    // No active session to clear — continue with reset
                    console.error('No active session to clear - continue with reset');
                  } finally {
                    setIsDialogOpen(false);
                    navigate('/landing');
                  }
                }}
              />
            </Dialogue>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;

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
                  navigate('/login');
                }}
              >
                Log Out - {user.email?.substring(0,1)}
              </Button>
            ) : (
              <Link
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
