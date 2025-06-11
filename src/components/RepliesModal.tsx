
import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Reply {
  id: string;
  message: string;
  status: string;
  created_at: string;
  replies: any[];
}

interface RepliesModalProps {
  sectionId: string;
  sectionTitle: string;
  onClose: () => void;
}

const RepliesModal: React.FC<RepliesModalProps> = ({
  sectionId,
  sectionTitle,
  onClose
}) => {
  const [requests, setRequests] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRequests();
  }, [sectionId]);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('edit_requests')
        .select('*')
        .eq('section_id', sectionId)
        .eq('page_url', window.location.href)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        toast({
          title: "Error",
          description: "Failed to load requests",
          variant: "destructive"
        });
        return;
      }

      setRequests(data || []);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'done':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress':
      case 'in progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'open':
      case 'pending':
      default:
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'done':
        return 'bg-green-100 text-green-700';
      case 'in_progress':
      case 'in progress':
        return 'bg-blue-100 text-blue-700';
      case 'open':
      case 'pending':
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Requests & Replies</h2>
            <p className="text-sm text-gray-500 mt-1">{sectionTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-2 text-gray-600">Loading requests...</span>
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No requests yet</h3>
              <p className="text-gray-500">No requests for this section yet. Be the first to submit feedback!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-xl p-4">
                  {/* Request Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(request.created_at)}
                    </span>
                  </div>

                  {/* Request Message */}
                  <div className="mb-3">
                    <p className="text-gray-900">{request.message}</p>
                  </div>

                  {/* Replies */}
                  {request.replies && request.replies.length > 0 && (
                    <div className="space-y-2 border-l-2 border-blue-100 pl-4 ml-2">
                      {request.replies.map((reply: any, index: number) => (
                        <div key={index} className="bg-blue-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-blue-700">Designer Reply</span>
                            <span className="text-xs text-blue-600">
                              {reply.created_at ? formatDate(reply.created_at) : 'Recently'}
                            </span>
                          </div>
                          <p className="text-sm text-blue-900">{reply.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RepliesModal;
