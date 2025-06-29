
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useProjectId } from '@/hooks/useProjectId';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  projectId: string | null;
  signUp: (email: string, password: string, projectId: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const projectId = useProjectId();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Notify WordPress Bridge of auth state changes
        if (session?.user) {
          window.parent.postMessage({
            type: 'lef-user-authenticated',
            userId: session.user.id,
            projectId: projectId
          }, '*');
        } else if (event === 'SIGNED_OUT') {
          window.parent.postMessage({
            type: 'lef-user-signed-out',
            projectId: projectId
          }, '*');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [projectId]);

  const signUp = async (email: string, password: string, projectIdParam: string) => {
    // Use the provided project ID or fall back to the context project ID
    const targetProjectId = projectIdParam || projectId;
    
    // Simple validation for demo purposes - allow demo project or projects starting with 'proj_'
    if (targetProjectId !== 'proj_demo123' && !targetProjectId?.startsWith('proj_')) {
      return { error: { message: 'Invalid Project ID. Please contact your designer.' } };
    }

    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          role: 'client',
          project_id: targetProjectId,
          project_ref: targetProjectId
        }
      }
    });

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    
    // Notify WordPress Bridge of sign out
    window.parent.postMessage({
      type: 'lef-user-signed-out',
      projectId: projectId
    }, '*');
  };

  const value = {
    user,
    session,
    loading,
    projectId,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
