import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const ensureSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        if (!cancelled) {
          setUser(session.user);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase.auth.signInAnonymously();
      if (cancelled) return;
      if (error) {
        console.error('Anonymous sign-in failed:', error.message);
      }
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    ensureSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // After explicit sign-out, drop straight back to an anonymous session so
      // the user can keep using the app without a re-login.
      if (event === 'SIGNED_OUT') {
        supabase.auth.signInAnonymously();
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
