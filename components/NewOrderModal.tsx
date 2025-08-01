"use client";
import React, { useState } from 'react';
import { X, Plus, Minus, DollarSign, User, MapPin, Phone, FileText } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCreated: (order: any) => void;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export default function NewOrderModal({ isOpen, onClose, onOrderCreated }: NewOrderModalProps) {
  const { restaurant } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [items, setItems] = useState<OrderItem[]>([
    { name: '', quantity: 1, price: 0 }
  ]);

  // Common menu items for quick selection
  const popularItems = [
    { name: 'Margherita Pizza', price: 18.90 },
    { name: 'Pepperoni Pizza', price: 21.90 },
    { name: 'Supreme Pizza', price: 24.90 },
    { name: 'Hawaiian Pizza', price: 22.90 },
    { name: 'Meat Lovers Pizza', price: 26.90 },
    { name: 'Garlic Bread', price: 8.50 },
    { name: 'Caesar Salad', price: 12.90 },
    { name: 'Chicken Wings', price: 14.90 },
    { name: 'Soft Drink', price: 3.50 },
  ];


  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const quickSelectItem = (item: { name: string; price: number }, index: number) => {
    updateItem(index, 'name', item.name);
    updateItem(index, 'price', item.price);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const resetForm = () => {
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setSpecialInstructions('');
    setItems([{ name: '', quantity: 1, price: 0 }]);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!restaurant) {
      setError('Restaurant information not available. Please ensure you have completed your restaurant profile in Settings.');
      return;
    }
    
    if (!restaurant.id) {
      setError('Restaurant ID not found. Please contact support.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
        setError('Please fill in all customer details');
        setLoading(false);
        return;
      }

      const validItems = items.filter(item => item.name.trim() && item.price > 0);
      if (validItems.length === 0) {
        setError('Please add at least one item');
        setLoading(false);
        return;
      }

      const total = calculateTotal();
      if (total <= 0) {
        setError('Order total must be greater than 0');
        setLoading(false);
        return;
      }

      // Generate order number
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      
      // Calculate fees
      const deliveryFee = restaurant.delivery_fee || 5.00;
      const subtotal = total;
      const totalWithDelivery = subtotal + deliveryFee;

      // Create order in Supabase
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            restaurant_id: restaurant.id,
            order_number: orderNumber,
            customer_name: customerName.trim(),
            customer_phone: customerPhone.trim(),
            customer_email: null,
            delivery_address: customerAddress.trim(),
            items: validItems,
            subtotal: subtotal,
            delivery_fee: deliveryFee,
            total_amount: totalWithDelivery,
            special_instructions: specialInstructions.trim() || null,
            status: 'pending',
            priority: 'normal',
            estimated_ready_at: new Date(Date.now() + (restaurant.average_prep_time || 15) * 60000).toISOString()
          }
        ])
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Create initial tracking record
      const { error: trackingError } = await supabase
        .from('order_tracking')
        .insert([
          {
            order_id: orderData.id,
            status: 'pending',
            notes: 'Order received'
          }
        ]);

      if (trackingError) {
        console.error('Error creating tracking record:', trackingError);
        // Don't fail the order creation for tracking errors
      }

      // Transform the data to match the expected format
      const formattedOrder = {
        id: orderData.id,
        orderNumber: orderData.order_number,
        customerName: orderData.customer_name,
        customerPhone: orderData.customer_phone,
        customerAddress: orderData.delivery_address,
        items: orderData.items,
        subtotal: orderData.subtotal,
        deliveryFee: orderData.delivery_fee,
        total: orderData.total_amount,
        orderTime: new Date(orderData.created_at),
        estimatedReady: new Date(orderData.estimated_ready_at),
        priority: orderData.priority,
        specialInstructions: orderData.special_instructions,
        status: orderData.status
      };

      onOrderCreated(formattedOrder);
      resetForm();
      onClose();
    } catch (err: any) {
      console.error('Error creating order:', err);
      setError(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-orange-500 text-white px-6 py-4 rounded-t-xl flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">New Order</h2>
              <p className="text-orange-100 text-sm">Create a new delivery order</p>
            </div>
            <button
              onClick={onClose}
              className="text-orange-200 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col flex-1">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Customer Information - Compact */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                placeholder="John Smith"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                placeholder="0412 345 678"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                placeholder="123 Main St, Melbourne VIC 3000"
                required
              />
            </div>

            {/* Order Items */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Order Items *
              </label>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-700">Item {index + 1}</span>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Minus size={16} />
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Item Name *
                        </label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateItem(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                          placeholder="Pizza, Salad, etc."
                          required
                        />
                        {/* Quick select for first item only */}
                        {index === 0 && item.name === '' && (
                          <div className="mt-2">
                            <p className="text-xs text-gray-500 mb-2">Quick select:</p>
                            <div className="flex flex-wrap gap-2">
                              {popularItems.slice(0, 4).map((popularItem) => (
                                <button
                                  key={popularItem.name}
                                  type="button"
                                  onClick={() => quickSelectItem(popularItem, index)}
                                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                                >
                                  {popularItem.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Qty *
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price *
                          </label>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={item.price}
                            onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addItem}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-600 hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add Another Item</span>
                </button>
              </div>
            </div>

            {/* Order Total */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">Order Total:</span>
                <span className="text-2xl font-bold text-green-600 flex items-center">
                  <DollarSign size={20} />
                  {calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Instructions
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                placeholder="Extra cheese, no onions, call when arriving..."
                rows={2}
              />
            </div>
          </div>
            
          {/* Fixed Form Actions */}
          <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || calculateTotal() <= 0}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    <span>Create Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}