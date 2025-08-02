import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Setup Guide - ZoomDishes',
  description: 'A step-by-step guide to setting up your ZoomDishes account.',
};

const SetupGuidePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Setup Guide</h1>
      <p className="text-lg mb-4">
        Welcome to ZoomDishes! Follow these simple steps to get your restaurant set up and ready to deliver.
      </p>
      <div className="prose lg:prose-xl">
        <h2>Step 1: Create Your Account</h2>
        <p>
          First, sign up for a free 14-day trial. You'll be asked to provide some basic information about your restaurant.
        </p>
        <h2>Step 2: Add Your Drivers</h2>
        <p>
          Navigate to the "Drivers" section in your dashboard and add your delivery drivers. You'll need to provide their name and phone number.
        </p>
        <h2>Step 3: Customize Your Branding</h2>
        <p>
          Go to the "Settings" page and upload your restaurant's logo and choose your brand colors. This will ensure your tracking pages match your brand.
        </p>
        <h2>Step 4: Start Creating Orders</h2>
        <p>
          You're all set! You can now start creating new orders from your dashboard and assign them to your drivers. Your customers will automatically receive a link to a branded tracking page.
        </p>
      </div>
    </div>
  );
};

export default SetupGuidePage;
