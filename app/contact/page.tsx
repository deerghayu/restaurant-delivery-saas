import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact ZoomDishes',
  description: 'Get in touch with the ZoomDishes team.',
};

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg mb-4">
        Have a question or need support? We're here to help.
      </p>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Email</h2>
        <p className="text-lg">
          For general inquiries, please email us at{' '}
          <a href="mailto:hello@zoomdishes.com" className="text-orange-600 hover:underline">
            hello@zoomdishes.com
          </a>
        </p>
        <p className="text-lg">
          For support, please email us at{' '}
          <a href="mailto:support@zoomdishes.com" className="text-orange-600 hover:underline">
            support@zoomdishes.com
          </a>
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">Address</h2>
        <p className="text-lg">
          ZoomDishes HQ
          <br />
          123 Fake Street
          <br />
          Sydney, NSW 2000
          <br />
          Australia
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
