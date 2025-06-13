
import React from 'react';
import EditableSection from '../components/EditableSection';
import { Sparkles, Users, Target, BarChart3, MessageSquare, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">WordPress Feedback Widget</h1>
                <p className="text-gray-500 text-sm">Click on any section to request edits</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Live Preview Mode
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Hero Section */}
          <EditableSection
            sectionId="hero-section"
            title="Hero Section"
            content="This is the main hero section of your page. It typically contains the primary headline, subtext, and call-to-action buttons. Hover over this section to see the edit request button appear."
            icon={<Zap className="w-5 h-5" />}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          />

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            <EditableSection
              sectionId="features-section"
              title="Features Section"
              content="This section showcases the key features and benefits of your product or service. It often includes icons, headlines, and descriptive text to highlight what makes your offering unique."
              icon={<Target className="w-5 h-5" />}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            />

            <EditableSection
              sectionId="gallery-section"
              title="Image Gallery"
              content="This is an image gallery or media section where you can display photos, videos, or other visual content. It's perfect for showcasing your work, products, or team."
              icon={<Users className="w-5 h-5" />}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            />
          </div>

          {/* Full Width Section */}
          <EditableSection
            sectionId="about-section"
            title="About Section"
            content="This is a full-width about section that tells your story. It typically includes company information, mission statements, or detailed descriptions about your services. This section often has more text content and can include testimonials or team information."
            icon={<BarChart3 className="w-5 h-5" />}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          />

          {/* Analytics Section */}
          <EditableSection
            sectionId="analytics-section"
            title="Analytics Dashboard"
            content="Track your performance with detailed analytics and insights. Monitor user engagement, conversion rates, and other key metrics to optimize your content strategy."
            icon={<BarChart3 className="w-5 h-5" />}
            className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
          />

          {/* Instructions Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">How to Use the Feedback System</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Hover to Discover</h4>
                    <p className="text-gray-600 text-sm">Hover over any section above to reveal the "Request Edit" button</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Open Feedback Modal</h4>
                    <p className="text-gray-600 text-sm">Click the button to open the feedback submission form</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Describe Changes</h4>
                    <p className="text-gray-600 text-sm">Detail your requested changes and optionally attach files</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Submit & Track</h4>
                    <p className="text-gray-600 text-sm">Submit your request and receive confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Hint */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 bg-gray-900 text-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-5 h-5 text-blue-400" />
          <p className="text-sm font-medium">Tap sections to request edits on mobile</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
