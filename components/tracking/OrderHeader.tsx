interface OrderHeaderProps {
  restaurantName: string;
  restaurantLogo: string;
  orderId: string;
}

const getOrderDisplayId = (id: string) => {
  return id && id.length >= 4 ? id.slice(-4) : id || "N/A";
};

export default function OrderHeader({ restaurantName, restaurantLogo, orderId }: OrderHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl">{restaurantLogo}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">{restaurantName}</h1>
            <p className="text-brand-subtle">
              Order #{getOrderDisplayId(orderId)} • Track Your Delivery
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}