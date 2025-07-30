import CustomerTrackingPage from "@/components/CustomerTrackingPage";

interface PageProps {
  params: { orderId: string };
}

export default function TrackOrder({ params }: PageProps) {
  const { orderId } = params;

  return <CustomerTrackingPage orderId={orderId} />;
}
