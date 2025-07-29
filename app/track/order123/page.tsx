import CustomerTrackingPage from "@/components/CustomerTrackingPage";

export default function TrackOrder({
  params,
}: {
  params: { orderId: string };
}) {
  return <CustomerTrackingPage orderId={params.orderId} />;
}
