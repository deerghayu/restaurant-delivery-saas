"use client";
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Minus, DollarSign, User, MapPin, Phone, FileText, UtensilsCrossed, Search, ChevronDown } from 'lucide-react';
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

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
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

  // Get menu items from restaurant data, fallback to sample items if none configured
  const restaurantMenuItems = restaurant?.menu_items || [];
  const defaultMenuItems: MenuItem[] = [
    // Pizzas
    { id: '1', name: 'Margherita Pizza', price: 18.90, category: 'Pizza' },
    { id: '2', name: 'Pepperoni Pizza', price: 21.90, category: 'Pizza' },
    { id: '3', name: 'Supreme Pizza', price: 24.90, category: 'Pizza' },
    { id: '4', name: 'Hawaiian Pizza', price: 22.90, category: 'Pizza' },
    { id: '5', name: 'Meat Lovers Pizza', price: 26.90, category: 'Pizza' },
    { id: '6', name: 'Vegetarian Pizza', price: 20.90, category: 'Pizza' },
    { id: '7', name: 'BBQ Chicken Pizza', price: 23.90, category: 'Pizza' },
    // Sides
    { id: '8', name: 'Garlic Bread', price: 8.50, category: 'Sides' },
    { id: '9', name: 'Cheesy Garlic Bread', price: 10.50, category: 'Sides' },
    { id: '10', name: 'Potato Wedges', price: 9.90, category: 'Sides' },
    { id: '11', name: 'Chicken Wings (6pc)', price: 14.90, category: 'Sides' },
    { id: '12', name: 'Chicken Wings (12pc)', price: 24.90, category: 'Sides' },
    // Salads
    { id: '13', name: 'Caesar Salad', price: 12.90, category: 'Salads' },
    { id: '14', name: 'Garden Salad', price: 10.90, category: 'Salads' },
    { id: '15', name: 'Greek Salad', price: 13.90, category: 'Salads' },
    // Beverages
    { id: '16', name: 'Coca Cola 375ml', price: 3.50, category: 'Beverages' },
    { id: '17', name: 'Sprite 375ml', price: 3.50, category: 'Beverages' },
    { id: '18', name: 'Orange Juice 375ml', price: 4.50, category: 'Beverages' },
    { id: '19', name: 'Water 600ml', price: 2.50, category: 'Beverages' },
    // Desserts
    { id: '20', name: 'Chocolate Brownie', price: 7.90, category: 'Desserts' },
    { id: '21', name: 'Tiramisu', price: 8.90, category: 'Desserts' },
    { id: '22', name: 'Gelato (2 scoops)', price: 6.90, category: 'Desserts' }
  ];
  
  const menuItems: MenuItem[] = restaurantMenuItems.length > 0 ? restaurantMenuItems : defaultMenuItems;

  const [searchTerms, setSearchTerms] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);



  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
      setSearchTerms(searchTerms.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
  };

  const selectMenuItem = (menuItem: MenuItem, index: number) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, name: menuItem.name, price: menuItem.price } : item
    );
    setItems(updatedItems);
    setDropdownOpen(null);
    // Clear search term for this item
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = '';
    setSearchTerms(newSearchTerms);
  };

  const filterMenuItems = (searchTerm: string) => {
    if (!searchTerm) return menuItems;
    return menuItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const updateSearchTerm = (index: number, term: string) => {
    const newSearchTerms = [...searchTerms];
    newSearchTerms[index] = term;
    setSearchTerms(newSearchTerms);
    setDropdownOpen(index);
  };

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
    setSearchTerms([...searchTerms, '']);
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
    setSearchTerms(['']);
    setDropdownOpen(null);
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
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-orange-500 text-white px-6 py-4 rounded-t-xl flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-white" />
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
          {/* Content with horizontal layout */}
          <div className="flex-1 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Left Column - Customer Information */}
              <div className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 col-span-full">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                    placeholder="Extra cheese, no onions, call when arriving..."
                    rows={3}
                  />
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
              </div>

              {/* Right Column - Order Items */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                
                <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
                  {items.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      {/* Header with remove button */}
                      {items.length > 1 && (
                        <div className="flex justify-end mb-3">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                            title="Remove item"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      )}
                      
                      {/* Menu Item Selector */}
                      <div className="mb-3 relative" ref={dropdownRef}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Menu Item #{index + 1}*
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={item.name || searchTerms[index] || ''}
                            onChange={(e) => {
                              if (!item.name) {
                                updateSearchTerm(index, e.target.value);
                              }
                            }}
                            onFocus={() => !item.name && setDropdownOpen(index)}
                            className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                            placeholder={item.name ? item.name : "Search menu items..."}
                            readOnly={!!item.name}
                            required
                          />
                          <div className="absolute right-2 top-2.5 flex items-center space-x-1">
                            {item.name && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updatedItems = items.map((item, i) => 
                                    i === index ? { ...item, name: '', price: 0 } : item
                                  );
                                  setItems(updatedItems);
                                  updateSearchTerm(index, '');
                                }}
                                className="text-gray-400 hover:text-gray-600 p-0.5"
                                title="Clear selection"
                              >
                                <X size={14} />
                              </button>
                            )}
                            {!item.name && (
                              <Search size={18} className="text-gray-400" />
                            )}
                          </div>
                          
                          {/* Dropdown */}
                          {dropdownOpen === index && !item.name && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                              {filterMenuItems(searchTerms[index] || '').length === 0 ? (
                                <div className="px-3 py-2 text-gray-500 text-sm">No items found</div>
                              ) : (
                                filterMenuItems(searchTerms[index] || '').map((menuItem) => (
                                  <button
                                    key={menuItem.id}
                                    type="button"
                                    onClick={() => selectMenuItem(menuItem, index)}
                                    className="w-full text-left px-3 py-2 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 focus:bg-orange-50 focus:outline-none"
                                  >
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <div className="font-medium text-gray-900">{menuItem.name}</div>
                                        <div className="text-xs text-gray-500">{menuItem.category}</div>
                                      </div>
                                      <div className="text-sm font-semibold text-green-600">${menuItem.price.toFixed(2)}</div>
                                    </div>
                                  </button>
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Quantity and Price in compact row */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Quantity
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                            className="w-full px-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white text-sm [&::-webkit-outer-spin-button]:appearance-auto [&::-webkit-inner-spin-button]:appearance-auto"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">
                            Price
                          </label>
                          <div className="relative">
                            <span className="absolute left-2 top-1.5 text-gray-500 text-sm">$</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={item.price}
                              onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                              className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white text-sm"
                              placeholder="0.00"
                              readOnly={!!item.name}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Item total */}
                      {item.price > 0 && (
                        <div className="mt-2 text-right">
                          <span className="text-sm font-medium text-gray-700">
                            Subtotal: <span className="text-green-600">${(item.quantity * item.price).toFixed(2)}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={addItem}
                    className="w-full border-2 border-dashed border-orange-200 rounded-lg py-2 text-orange-600 hover:border-orange-400 hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                  >
                    <Plus size={16} />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>
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