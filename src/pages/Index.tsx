
import React from 'react';
import EditableSection from '../components/EditableSection';
import { FileText, Image, Zap, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">WordPress Feedback Widget</h1>
              <p className="text-gray-600 text-sm mt-1">Click on any section to request edits</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                ✓ Live Preview Mode
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Hero Section - Simulated as editable */}
          <EditableSection
            sectionId="hero-section"
            title="Hero Section"
            content="This is the main hero section of your page. It typically contains the primary headline, subtext, and call-to-action buttons. Hover over this section to see the edit request button appear."
            icon={<Zap className="w-6 h-6" />}
            className="bg-gradient-to-r from-blue-500/5 to-purple-500/5"
          />

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <EditableSection
              sectionId="features-section"
              title="Features Section"
              content="This section showcases the key features and benefits of your product or service. It often includes icons, headlines, and descriptive text to highlight what makes your offering unique."
              icon={<FileText className="w-6 h-6" />}
            />

            <EditableSection
              sectionId="gallery-section"
              title="Image Gallery"
              content="This is an image gallery or media section where you can display photos, videos, or other visual content. It's perfect for showcasing your work, products, or team."
              icon={<Image className="w-6 h-6" />}
            />
          </div>

          {/* Full Width Section */}
          <EditableSection
            sectionId="about-section"
            title="About Section"
            content="This is a full-width about section that tells your story. It typically includes company information, mission statements, or detailed descriptions about your services. This section often has more text content and can include testimonials or team information."
            icon={<Globe className="w-6 h-6" />}
            className="bg-gradient-to-r from-green-500/5 to-blue-500/5"
          />

          {/* Instructions */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use</h3>
            <div className="space-y-3 text-gray-600">
              <p className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">1</span>
                Hover over any section above to see the "Request Edit" button appear
              </p>
              <p className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">2</span>
                Click the button to open the feedback modal
              </p>
              <p className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">3</span>
                Describe your requested changes and optionally attach files
              </p>
              <p className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">4</span>
                Submit and receive confirmation that your request was sent
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Note */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg text-center text-sm">
        💡 On mobile, tap sections to request edits
      </div>
    </div>
  );
};

export default Index;
