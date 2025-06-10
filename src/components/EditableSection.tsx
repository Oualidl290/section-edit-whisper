
import React, { useState } from 'react';
import { FileText, Settings, Image } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

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
  const [showModal, setShowModal] = useState(false);

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
        
        {/* Floating Edit Button */}
        {isHovered && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 flex items-center gap-2 text-sm font-medium z-10"
          >
            <Settings className="w-4 h-4" />
            Request Edit
          </button>
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

      {showModal && (
        <FeedbackModal
          sectionId={sectionId}
          sectionTitle={title}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default EditableSection;
