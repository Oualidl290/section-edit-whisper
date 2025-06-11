
import React, { useState } from 'react';
import { Edit, MessageSquare } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import FeedbackModal from './FeedbackModal';
import RepliesModal from './RepliesModal';

interface EditableSectionProps {
  sectionId: string;
  title: string;
  content: string;
  icon?: React.ReactNode;
  className?: string;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  sectionId,
  title,
  content,
  icon,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showRepliesModal, setShowRepliesModal] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleEditRequest = () => {
    setPopoverOpen(false);
    setShowFeedbackModal(true);
  };

  const handleShowReplies = () => {
    setPopoverOpen(false);
    setShowRepliesModal(true);
  };

  return (
    <>
      <div
        className={`relative group transition-all duration-300 rounded-2xl p-8 bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          boxShadow: isHovered 
            ? '0 20px 60px -12px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)' 
            : undefined
        }}
      >
        {/* Hover Glow Effect */}
        {isHovered && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none" />
        )}
        
        {/* Floating Edit Icon with Popover */}
        {isHovered && (
          <div className="absolute top-4 right-4 z-10">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 bg-white hover:bg-blue-50 border-blue-200 shadow-lg rounded-full"
                      >
                        <Edit className="w-4 h-4 text-blue-600" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2" align="end">
                      <div className="space-y-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm"
                          onClick={handleEditRequest}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Request
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm"
                          onClick={handleShowReplies}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Show Replies
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to give feedback</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}

        {/* Section Content */}
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{content}</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showFeedbackModal && (
        <FeedbackModal
          sectionId={sectionId}
          sectionTitle={title}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}

      {showRepliesModal && (
        <RepliesModal
          sectionId={sectionId}
          sectionTitle={title}
          onClose={() => setShowRepliesModal(false)}
        />
      )}
    </>
  );
};

export default EditableSection;
