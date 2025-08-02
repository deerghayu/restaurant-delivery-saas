import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - ZoomDishes',
  description: 'Read the ZoomDishes terms of service.',
};

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <h2 className="text-2xl font-bold mt-6 mb-2">1. Terms</h2>
      <p className="text-lg mb-4">
        By accessing the website at https://www.zoomdishes.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-2">2. Use License</h2>
      <p className="text-lg mb-4">
        Permission is granted to temporarily download one copy of the materials (information or software) on ZoomDishes' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on ZoomDishes' website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server.
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-2">3. Disclaimer</h2>
      <p className="text-lg mb-4">
        The materials on ZoomDishes' website are provided on an 'as is' basis. ZoomDishes makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-2">4. Limitations</h2>
      <p className="text-lg mb-4">
        In no event shall ZoomDishes or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ZoomDishes' website, even if ZoomDishes or a ZoomDishes authorized representative has been notified orally or in writing of the possibility of such damage.
      </p>
      <h2 className="text-2xl font-bold mt-6 mb-2">5. Governing Law</h2>
      <p className="text-lg mb-4">
        These terms and conditions are governed by and construed in accordance with the laws of New South Wales, Australia and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
      </p>
    </div>
  );
};

export default TermsPage;
