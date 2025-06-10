
import React, { useState } from 'react';
import { X, Upload, Check, FileText, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FeedbackModalProps {
  sectionId: string;
  sectionTitle: string;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  sectionId,
  sectionTitle,
  onClose
}) => {
  const [feedback, setFeedback] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Prepare the data for submission
      const submissionData = {
        message: feedback,
        section_id: sectionId,
        page_url: window.location.href,
        status: 'open',
        submitted_by: 'client' // Since this is for client submissions
      };

      console.log('Submitting feedback:', submissionData);

      // Submit to Supabase
      const { data, error } = await supabase
        .from('edit_requests')
        .insert([submissionData])
        .select();

      if (error) {
        console.error('Error submitting feedback:', error);
        toast({
          title: "Error",
          description: "Failed to submit your request. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Feedback submitted successfully:', data);

      // Handle file upload if there's a file
      if (file && data && data[0]) {
        console.log('File upload will be implemented in future version:', file.name);
        // For now, just log the file info since storage isn't set up yet
      }

      setIsSuccess(true);
      toast({
        title: "Success!",
        description: "Your edit request has been submitted successfully."
      });

      // Auto close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center transform animate-scale-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Request Sent!</h3>
          <p className="text-gray-600">Thanks! Your edit request has been sent to the team.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transform animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Request Edit</h2>
            <p className="text-sm text-gray-500 mt-1">{sectionTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Feedback Textarea */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-3">
              What would you like to change?
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe the changes you'd like to see in this section..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
              rows={4}
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Attach file (optional)
            </label>
            
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
                  isDragOver 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    Screenshots, documents (PDF, DOC, DOCX)
                  </p>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  {file.type.startsWith('image/') ? (
                    <Camera className="w-5 h-5 text-blue-600" />
                  ) : (
                    <FileText className="w-5 h-5 text-blue-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!feedback.trim() || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-4 rounded-xl transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              'Send Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
