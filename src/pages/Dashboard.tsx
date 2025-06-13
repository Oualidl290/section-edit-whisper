
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, User, Briefcase, Globe } from 'lucide-react';
import Index from './Index';

const Dashboard = () => {
  const { user, signOut, projectId } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  // Notify WordPress Bridge that the dashboard is ready
  useEffect(() => {
    if (user && projectId) {
      window.parent.postMessage({
        type: 'lef-dashboard-ready',
        userId: user.id,
        projectId: projectId
      }, '*');
    }
  }, [user, projectId]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Auth Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Feedback Dashboard</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-3 h-3" />
                    {user?.email}
                  </div>
                  {projectId && (
                    <>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        Widget Project: {projectId}
                      </div>
                    </>
                  )}
                  {(profile?.project_ref || profile?.project_id || user?.user_metadata?.project_ref) && (
                    <>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3 h-3" />
                        User Project: {profile?.project_ref || profile?.project_id || user?.user_metadata?.project_ref}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <Index />
    </div>
  );
};

export default Dashboard;
