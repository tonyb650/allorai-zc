import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const errorParam = params.get('error');

    if (errorParam) {
      console.error('Auth callback error:', errorParam);
      navigate('/', { replace: true });
      return;
    }

    const handlePostAuth = () => {
      const redirectPath = localStorage.getItem('loginRedirectPath') || '/';
      localStorage.removeItem('loginRedirectPath');
      navigate(redirectPath, { replace: true });
    };

    if (code) {
      supabase.auth.exchangeCodeForSession(window.location.search).then(({ error }) => {
        if (error) {
          console.error('Auth callback error:', error.message);
          navigate('/', { replace: true });
        } else {
          handlePostAuth();
        }
      });
    } else {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          subscription.unsubscribe();
          handlePostAuth();
        }
      });
      return () => subscription.unsubscribe();
    }

    return;
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Signing you in...</p>
    </div>
  );
};

export default AuthCallbackPage;
