import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { Shield, FileText, Scale, AlertCircle, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service - ZoomDishes',
  description: 'Read the ZoomDishes terms of service and understand our commitment to transparent, fair business practices.',
  openGraph: {
    title: 'Terms of Service - ZoomDishes',
    description: 'Read the ZoomDishes terms of service and understand our commitment to transparent, fair business practices.',
  },
};

const termsSection = [
  {
    icon: FileText,
    title: 'Terms',
    bgColor: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    iconBg: 'from-blue-500 to-indigo-500',
    content: 'By accessing the website at https://www.zoomdishes.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.'
  },
  {
    icon: Shield,
    title: 'Use License',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    iconBg: 'from-green-500 to-emerald-500',
    content: 'Permission is granted to temporarily download one copy of the materials (information or software) on ZoomDishes\' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on ZoomDishes\' website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.'
  },
  {
    icon: AlertCircle,
    title: 'Disclaimer',
    bgColor: 'from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    iconBg: 'from-yellow-500 to-orange-500',
    content: 'The materials on ZoomDishes\' website are provided on an \'as is\' basis. ZoomDishes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
  },
  {
    icon: Scale,
    title: 'Limitations',
    bgColor: 'from-red-50 to-pink-50',
    borderColor: 'border-red-200',
    iconBg: 'from-red-500 to-pink-500',
    content: 'In no event shall ZoomDishes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ZoomDishes\' website, even if ZoomDishes or a ZoomDishes authorized representative has been notified orally or in writing of the possibility of such damage.'
  },
  {
    icon: Globe,
    title: 'Governing Law',
    bgColor: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    iconBg: 'from-purple-500 to-violet-500',
    content: 'These terms and conditions are governed by and construed in accordance with the laws of New South Wales, Australia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.'
  }
];

const TermsPage = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Our commitment to transparent, fair business practices and your rights as a ZoomDishes user.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {termsSection.map((section, index) => (
              <div key={index} className={`bg-gradient-to-br ${section.bgColor} rounded-2xl p-8 border ${section.borderColor}`}>
                <div className="flex items-center gap-6 mb-8">
                  <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${section.iconBg} rounded-2xl text-white`}>
                    <section.icon className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{index + 1}. {section.title}</h2>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-sm">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Questions About Our Terms?</h2>
            <p className="text-xl opacity-90 mb-8">
              Our Australian support team is here to help clarify any questions about our terms of service.
            </p>
            <a 
              href="mailto:legal@zoomdishes.com"
              className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsPage;
