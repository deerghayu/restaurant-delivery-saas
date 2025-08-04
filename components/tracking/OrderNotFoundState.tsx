import Link from 'next/link';
import { Button } from '@/components/ui';

export default function OrderNotFoundState() {
  return (
    <div className="min-h-screen brand-gradient-bg flex items-center justify-center">
      <div className="bg-card rounded-xl shadow-lg p-8 border border-border text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-card-foreground mb-2">
          Order Not Found
        </h1>
        <p className="text-muted-foreground mb-4">
          Please check your order ID and try again.
        </p>
        <Link href="/">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}