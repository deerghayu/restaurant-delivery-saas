import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & FAQ - ZoomDishes',
  description: 'Find answers to frequently asked questions about ZoomDishes.',
};

const HelpPage = () => {
  const faqs = [
    {
      question: 'What is ZoomDishes?',
      answer: 'ZoomDishes is a delivery management platform for restaurants that allows them to use their own drivers and provide branded, real-time tracking to their customers.',
    },
    {
      question: 'How much does it cost?',
      answer: 'We have a simple, flat-rate pricing of $49 per month. This includes unlimited deliveries and support for up to 3 drivers. There are no per-delivery fees or hidden charges.',
    },
    {
      question: 'Do I need my own drivers?',
      answer: 'Yes, ZoomDishes is designed for restaurants that have their own delivery drivers. We provide the software to manage and track your deliveries.',
    },
    {
      question: 'How long does it take to set up?',
      answer: 'You can be up and running in as little as 5 minutes. Our onboarding process is simple and requires no technical expertise.',
    },
    {
      question: 'Is there a free trial?',
      answer: 'Yes, we offer a 14-day free trial with no credit card required. You can explore all the features of ZoomDishes and see if it\'s the right fit for your restaurant.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{faq.question}</h2>
            <p className="text-lg">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
