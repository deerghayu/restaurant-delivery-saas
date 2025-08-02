# ZoomDishes - Restaurant Delivery Management SaaS

[![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-2.53.0-green)](https://supabase.com/)

A lightweight, affordable delivery management platform built specifically for Australian small restaurants. Empower your restaurant to own its delivery experience with professional branded tracking and comprehensive management tools.

## ✨ Features

### 🚚 **Own Your Brand**
- Branded tracking pages at `yourrestaurant.com/track`
- Custom branding throughout the customer experience
- White-label solution with your restaurant's identity

### 💰 **Predictable Pricing**
- Fixed monthly plans starting at $49
- No per-delivery fees or hidden charges
- Transparent pricing structure

### ⚡ **5-Minute Setup**
- No engineers needed
- Simple onboarding walkthrough
- Get delivering in minutes, not days

### 👥 **Perfect for Small Teams**
- Built specifically for restaurants with 1-3 drivers
- Intuitive driver management
- Everything you need, nothing you don't

### 📍 **Real-Time Tracking**
- Professional tracking experience for customers
- Live order status updates
- Reduce customer calls and complaints

### 🇦🇺 **Australian Made**
- Built by Aussies, for Aussies
- Local support and market understanding
- Compliant with Australian business requirements

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd restaurant-delivery-saas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
restaurant-delivery-saas/
├── app/                          # Next.js 14 App Router
│   ├── api/                      # API routes
│   │   └── drivers/              # Driver management API
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Restaurant dashboard
│   ├── drivers/                  # Driver management pages
│   ├── settings/                 # Restaurant settings
│   ├── track/                    # Customer tracking pages
│   │   └── [orderId]/            # Dynamic order tracking
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Landing page
├── components/                   # Reusable React components
│   ├── drivers/                  # Driver-specific components
│   │   ├── DriverFormModal.tsx
│   │   ├── DriverList.tsx
│   │   └── DriverStatsCards.tsx
│   ├── settings/                 # Settings components
│   │   ├── BrandingTab.tsx
│   │   ├── DeliveryTab.tsx
│   │   ├── MenuTab.tsx
│   │   ├── OperationsTab.tsx
│   │   ├── ProfileTab.tsx
│   │   ├── SubscriptionTab.tsx
│   │   └── SettingsTabNavigation.tsx
│   ├── tracking/                 # Order tracking components
│   │   ├── ErrorState.tsx
│   │   ├── LoadingState.tsx
│   │   ├── OrderHeader.tsx
│   │   ├── OrderSummary.tsx
│   │   ├── OrderTimeline.tsx
│   │   └── StatusCard.tsx
│   ├── AuthForm.tsx              # Authentication form
│   ├── CustomerTrackingPage.tsx  # Customer tracking interface
│   ├── LandingPage.tsx           # Main landing page
│   ├── NewOrderModal.tsx         # Order creation modal
│   ├── OrderStatusBoard.tsx      # Main dashboard orders view
│   ├── RestaurantDashboardHeader.tsx # Dashboard header
│   └── RestaurantOnboardingWizard.tsx # Setup wizard
├── contexts/                     # React contexts
│   └── AuthContext.tsx           # Authentication context
├── hooks/                        # Custom React hooks
│   └── useErrorHandler.ts        # Error handling hook
├── lib/                          # Utility libraries
│   ├── constants.ts              # App constants
│   ├── supabase.ts               # Supabase client
│   ├── utils.ts                  # General utilities
│   └── validations.ts            # Form validations
├── types/                        # TypeScript type definitions
│   └── database.ts               # Database types
├── utils/                        # Utility functions
│   ├── api.ts                    # API utilities
│   └── restaurant.ts             # Restaurant-specific utilities
├── __tests__/                    # Test files
└── public/                       # Static assets
    └── images/                   # Image assets
```

## 🛣️ Key Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with features and signup |
| `/auth` | Authentication (login/signup) |
| `/auth?mode=signup` | Direct signup form |
| `/dashboard` | Restaurant management dashboard |
| `/drivers` | Driver management interface |
| `/settings` | Restaurant settings and configuration |
| `/track/[orderId]` | Customer order tracking page |

## 🛠️ Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - App Router with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service with PostgreSQL
- **[Zod](https://zod.dev/)** - Schema validation

### Tools & Analytics
- **[Vercel Analytics](https://vercel.com/analytics)** - Web analytics
- **[Vercel Speed Insights](https://vercel.com/docs/speed-insights)** - Performance monitoring

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   npx vercel
   ```

3. **Set environment variables in Vercel dashboard**

4. **Connect your domain** (optional)

### Alternative Deployment Options

- **Netlify**: Connect your GitHub repository
- **Railway**: One-click deployment
- **Docker**: Build container with `npm run build`

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes and commit:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to your branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Standards

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add tests for new features
- Ensure code passes linting

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check our [Wiki](../../wiki) for detailed guides
- **Issues**: Report bugs or request features via [GitHub Issues](../../issues)
- **Discussions**: Join community discussions in [GitHub Discussions](../../discussions)

## 🌟 Acknowledgments

- Built with ❤️ for Australian small restaurant owners
- Inspired by the need for affordable, branded delivery solutions
- Special thanks to the Next.js and Supabase communities

---

**Made with ❤️  in Australia** | [Website](https://zoomdishes.com) | [Documentation](../../wiki) | [Support](../../issues)