import { useState } from 'react';
import { UtensilsCrossed, Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { FormField, FormSelect, Button, SectionHeader, StatusMessage, Card } from '@/components/ui';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
}

interface MenuTabProps {
  formData: {
    menu_items: MenuItem[];
  };
  updateFormData: (field: string, value: any) => void;
}

export default function MenuTab({ formData, updateFormData }: MenuTabProps) {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState<Omit<MenuItem, 'id'>>({
    name: '',
    price: 0,
    category: 'Pizza',
    description: ''
  });

  const categories = ['Pizza', 'Sides', 'Salads', 'Beverages', 'Desserts'];
  const menuItems = formData.menu_items || [];

  const addItem = () => {
    if (!newItem.name.trim() || newItem.price <= 0) return;
    
    const item: MenuItem = {
      ...newItem,
      id: Date.now().toString(),
      name: newItem.name.trim()
    };
    
    const updatedItems = [...menuItems, item];
    updateFormData('menu_items', updatedItems);
    
    setNewItem({ name: '', price: 0, category: 'Pizza', description: '' });
    setIsAddingItem(false);
  };

  const updateItem = (id: string, updatedItem: Partial<MenuItem>) => {
    const updatedItems = menuItems.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    );
    updateFormData('menu_items', updatedItems);
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    const updatedItems = menuItems.filter(item => item.id !== id);
    updateFormData('menu_items', updatedItems);
  };

  const groupedItems = categories.reduce((acc, category) => {
    acc[category] = menuItems.filter(item => item.category === category);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Menu Management"
        description="Manage your restaurant's menu items. These will be available when creating new orders."
        icon={UtensilsCrossed}
        variant="blue"
      />

      {/* Add New Item Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Menu Items ({menuItems.length})</h3>
        <Button
          onClick={() => setIsAddingItem(true)}
          variant="primary"
          size="md"
          icon={Plus}
        >
          Add Item
        </Button>
      </div>

      {/* Add Item Form */}
      {isAddingItem && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-4">Add New Menu Item</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Item Name"
              type="text"
              value={newItem.name}
              onChange={(value) => setNewItem({ ...newItem, name: value })}
              placeholder="Margherita Pizza"
              icon={UtensilsCrossed}
              iconColor="text-blue-500"
              required
            />
            
            <FormField
              label="Price (AUD)"
              type="number"
              value={newItem.price.toString()}
              onChange={(value) => setNewItem({ ...newItem, price: parseFloat(value) || 0 })}
              placeholder="18.90"
              icon={DollarSign}
              iconColor="text-green-500"
              required
            />
            
            <FormSelect
              label="Category"
              value={newItem.category}
              onChange={(value) => setNewItem({ ...newItem, category: value })}
              options={categories.map(cat => ({ value: cat, label: cat }))}
              required
            />
            <FormField
              label="Description"
              type="text"
              value={newItem.description || ''}
              onChange={(value) => setNewItem({ ...newItem, description: value })}
              placeholder="Classic tomato base with mozzarella"
            />
          </div>
          <div className="flex space-x-3 mt-4">
            <Button
              onClick={addItem}
              variant="primary"
              size="md"
            >
              Add Item
            </Button>
            <Button
              onClick={() => {
                setIsAddingItem(false);
                setNewItem({ name: '', price: 0, category: 'Pizza', description: '' });
              }}
              variant="ghost"
              size="md"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Menu Items by Category */}
      <div className="space-y-6">
        {categories.map(category => (
          <Card key={category}>
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h4 className="font-medium text-gray-900 flex items-center justify-between">
                <span>{category}</span>
                <span className="text-sm text-gray-500">
                  {groupedItems[category]?.length || 0} items
                </span>
              </h4>
            </div>
            <div className="p-4">
              {groupedItems[category]?.length > 0 ? (
                <div className="space-y-3">
                  {groupedItems[category].map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h5 className="font-medium text-gray-900">{item.name}</h5>
                            {item.description && (
                              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            )}
                          </div>
                          <div className="text-lg font-semibold text-green-600">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          onClick={() => setEditingItem(item)}
                          variant="ghost"
                          size="sm"
                          icon={Edit}
                          title="Edit item"
                          className="text-blue-600 hover:text-blue-800 p-1"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteItem(item.id)}
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          title="Delete item"
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  No items in this category yet. Add some items to get started!
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="shadow-xl max-w-md w-full">
            <h4 className="font-medium text-gray-900 mb-4">Edit Menu Item</h4>
            <div className="space-y-4">
              <FormField
                label="Item Name"
                type="text"
                value={editingItem.name}
                onChange={(value) => setEditingItem({ ...editingItem, name: value })}
                placeholder="Margherita Pizza"
                icon={UtensilsCrossed}
                iconColor="text-blue-500"
                required
              />
              
              <FormField
                label="Price (AUD)"
                type="number"
                value={editingItem.price.toString()}
                onChange={(value) => setEditingItem({ ...editingItem, price: parseFloat(value) || 0 })}
                placeholder="18.90"
                icon={DollarSign}
                iconColor="text-green-500"
                required
              />
              
              <FormSelect
                label="Category"
                value={editingItem.category}
                onChange={(value) => setEditingItem({ ...editingItem, category: value })}
                options={categories.map(cat => ({ value: cat, label: cat }))}
                required
              />
              
              <FormField
                label="Description"
                type="text"
                value={editingItem.description || ''}
                onChange={(value) => setEditingItem({ ...editingItem, description: value })}
                placeholder="Classic tomato base with mozzarella"
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <Button
                onClick={() => updateItem(editingItem.id, editingItem)}
                variant="primary"
                size="md"
              >
                Update Item
              </Button>
              <Button
                onClick={() => setEditingItem(null)}
                variant="ghost"
                size="md"
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}