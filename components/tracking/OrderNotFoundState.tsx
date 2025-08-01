export default function OrderNotFoundState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Not Found
        </h1>
        <p className="text-gray-600 mb-4">
          Please check your order ID and try again.
        </p>
        <a
          href="/"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}