import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ZoomDishes',
  description: 'Learn more about ZoomDishes, the leading food delivery platform in Australia.',
};

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">About ZoomDishes</h1>
      <p className="text-lg mb-4">
        ZoomDishes is an Australian-owned and operated food delivery platform founded in 2024. Our mission is to empower local restaurants to take control of their delivery operations, providing them with the tools they need to offer fast, reliable, and branded delivery experiences to their customers.
      </p>
      <p className="text-lg mb-4">
        We believe that restaurants shouldn't have to pay exorbitant commission fees to third-party delivery giants. With ZoomDishes, restaurants can use their own drivers and keep more of their hard-earned revenue.
      </p>
      <p className="text-lg">
        Our platform is built with the latest technology to provide real-time tracking, seamless order management, and a delightful experience for both restaurants and their customers.
      </p>
    </div>
  );
};

export default AboutPage;
