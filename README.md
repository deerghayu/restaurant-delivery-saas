# ZoomDishes - Restaurant Delivery Management SaaS

A lightweight, affordable delivery management platform built specifically for Australian small restaurants.

## Features

- 🚚 **Own Your Brand**: Branded tracking pages at yourrestaurant.com/track
- 💰 **Predictable Pricing**: Fixed monthly plans starting at $49
- ⚡ **5-Minute Setup**: No engineers needed, simple walkthrough
- 👥 **Perfect for Small Teams**: Built for restaurants with 1-3 drivers
- 📍 **Real-Time Tracking**: Professional tracking experience for customers
- 🇦🇺 **Australian Made**: Local support and understanding

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd restaurant-delivery-saas
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## Deployment to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to connect your GitHub repository.

## Project Structure

```
├── app/                 # Next.js 13+ app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Landing page
│   ├── dashboard/      # Dashboard pages
│   └── track/          # Customer tracking pages
├── components/         # Reusable React components
├── lib/               # Utility functions
└── public/           # Static assets
```

## Key Routes

- `/` - Landing page
- `/dashboard` - Restaurant dashboard
- `/track/[orderId]` - Customer tracking page

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Language**: TypeScript

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.


## Deployment Instructions

1. **Initialize Git repository:**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Push to GitHub:**
```bash
git remote add origin <your-github-repo-url>
git push -u origin main
```

3. **Deploy to Vercel:**
```bash
npx vercel
```

Follow the prompts to deploy!