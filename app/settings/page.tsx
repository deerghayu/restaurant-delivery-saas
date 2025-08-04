"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import {
  ArrowLeft,
  User,
  Palette,
  Menu,
  Settings as SettingsIcon,
  Truck,
  CreditCard,
  Save
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Button,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Alert,
  AlertDescription,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  Separator,
  Textarea
} from '@/components/ui';

export default function SettingsPage() {
  const { user, restaurant } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: restaurant?.name || '',
    suburb: restaurant?.suburb || '',
    state: restaurant?.state || '',
    logo_url: restaurant?.logo_url || '',
    primary_color: restaurant?.primary_color || '#FF6B35',
    phone: restaurant?.phone || ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      setSaveMessage("Error saving settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <Separator orientation="vertical" className="h-6" />
                <div>
                  <h1 className="text-xl font-semibold">Restaurant Settings</h1>
                  <p className="text-sm text-muted-foreground">
                    Manage your restaurant's profile and preferences
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="btn-brand"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {saveMessage && (
            <Alert className="mb-6">
              <AlertDescription>{saveMessage}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      {formData.logo_url ? (
                        <AvatarImage src={formData.logo_url} alt={formData.name} />
                      ) : (
                        <AvatarFallback>
                          {formData.name.substring(0, 2).toUpperCase() || "R"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{formData.name || "Your Restaurant"}</h3>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 h-auto">
                      <TabsTrigger value="profile" className="justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger value="branding" className="justify-start">
                        <Palette className="w-4 h-4 mr-2" />
                        Branding
                      </TabsTrigger>
                      <TabsTrigger value="operations" className="justify-start">
                        <SettingsIcon className="w-4 h-4 mr-2" />
                        Operations
                      </TabsTrigger>
                      <TabsTrigger value="delivery" className="justify-start">
                        <Truck className="w-4 h-4 mr-2" />
                        Delivery
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                {/* Profile Tab */}
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Restaurant Profile</CardTitle>
                      <CardDescription>
                        Basic information about your restaurant
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="restaurant-name">Restaurant Name</Label>
                          <Input
                            id="restaurant-name"
                            value={formData.name}
                            onChange={(e) => updateFormData('name', e.target.value)}
                            placeholder="Your Restaurant Name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            placeholder="+61 123 456 789"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="suburb">Suburb</Label>
                          <Input
                            id="suburb"
                            value={formData.suburb}
                            onChange={(e) => updateFormData('suburb', e.target.value)}
                            placeholder="Melbourne"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => updateFormData('state', e.target.value)}
                            placeholder="VIC"
                          />
                        </div>
                      </div>

                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Branding Tab */}
                <TabsContent value="branding">
                  <Card>
                    <CardHeader>
                      <CardTitle>Branding & Theme</CardTitle>
                      <CardDescription>
                        Customize your restaurant's visual identity
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Label>Restaurant Logo</Label>
                            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                              {formData.logo_url ? (
                                <div className="space-y-4">
                                  <img 
                                    src={formData.logo_url} 
                                    alt="Restaurant logo"
                                    className="w-24 h-24 object-cover rounded-full mx-auto"
                                  />
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => updateFormData('logo_url', '')}
                                  >
                                    Remove logo
                                  </Button>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <div className="w-12 h-12 bg-muted rounded-full mx-auto flex items-center justify-center">
                                    🍕
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    Logo upload coming soon
                                  </p>
                                </div>
                              )}
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="logo-url">Logo URL</Label>
                              <Input
                                id="logo-url"
                                type="url"
                                value={formData.logo_url}
                                onChange={(e) => updateFormData('logo_url', e.target.value)}
                                placeholder="/favicon.ico"
                              />
                              <p className="text-xs text-muted-foreground">
                                Enter a direct link to your logo image (try /favicon.ico for your site's favicon)
                              </p>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label>Brand Color</Label>
                            <div className="flex items-center space-x-4">
                              <input
                                type="color"
                                value={formData.primary_color}
                                onChange={(e) => updateFormData('primary_color', e.target.value)}
                                className="w-16 h-12 border border-input rounded-lg cursor-pointer"
                              />
                              <div className="flex-1">
                                <Input
                                  type="text"
                                  value={formData.primary_color}
                                  onChange={(e) => updateFormData('primary_color', e.target.value)}
                                  placeholder="#FF6B35"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Label>Preview</Label>
                          <div 
                            className="border rounded-lg p-4 text-white bg-primary"
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10 border-2 border-white/20">
                                {formData.logo_url ? (
                                  <AvatarImage src={formData.logo_url} />
                                ) : (
                                  <AvatarFallback className="bg-white/20">🍕</AvatarFallback>
                                )}
                              </Avatar>
                              <div>
                                <h4 className="font-bold">{formData.name || 'Your Restaurant'}</h4>
                                <p className="text-sm opacity-90">{formData.suburb}, {formData.state}</p>
                              </div>
                            </div>
                          </div>
                          
                          <Alert variant="info">
                            <AlertDescription>
                              This color will appear in your dashboard header and customer-facing pages
                            </AlertDescription>
                          </Alert>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Operations Tab */}
                <TabsContent value="operations">
                  <Card>
                    <CardHeader>
                      <CardTitle>Operations</CardTitle>
                      <CardDescription>
                        Configure your restaurant's operational settings
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <SettingsIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Operations Settings</h3>
                        <p className="text-muted-foreground">
                          Business hours, delivery zones, and operational preferences will be available here.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Delivery Tab */}
                <TabsContent value="delivery">
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Settings</CardTitle>
                      <CardDescription>
                        Configure delivery zones, fees, and driver management
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12">
                        <Truck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Delivery Configuration</h3>
                        <p className="text-muted-foreground mb-4">
                          Delivery zones, fees, estimated times, and driver assignment will be available here.
                        </p>
                        <Link href="/drivers">
                          <Button variant="outline">
                            <User className="w-4 h-4 mr-2" />
                            Manage Drivers
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}