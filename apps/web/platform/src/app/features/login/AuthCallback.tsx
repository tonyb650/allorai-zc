import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const errorParam = params.get('error');

    if (errorParam) {
      console.error('Auth callback error:', errorParam);
      navigate('/login', { replace: true });
      return;
    }

    if (code) {
      // PKCE flow: exchange the code for a session
      supabase.auth.exchangeCodeForSession(window.location.search).then(({ error }) => {
        if (error) {
          console.error('Auth callback error:', error.message);
          navigate('/login', { replace: true });
        } else {
          const redirectPath = localStorage.getItem('loginRedirectPath') || '/';
          localStorage.removeItem('loginRedirectPath');
          navigate(redirectPath, { replace: true });
        }
      });
    } else {
      // Implicit flow: SDK processes #access_token from the hash automatically
      // (detectSessionInUrl is true by default). Just wait for SIGNED_IN.
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          subscription.unsubscribe();
          const redirectPath = localStorage.getItem('loginRedirectPath') || '/';
          localStorage.removeItem('loginRedirectPath');
          navigate(redirectPath, { replace: true });
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

export default AuthCallback;
