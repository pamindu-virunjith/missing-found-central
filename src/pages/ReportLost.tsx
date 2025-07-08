
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import ImageUpload from '@/components/ImageUpload';

type ItemCategory = Database['public']['Enums']['item_category'];

const categories: ItemCategory[] = ["Electronics", "Bags", "Accessories", "Books", "Clothing", "Other"];

const ReportLost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '' as ItemCategory | '',
    date: '',
    location: '',
    contactInfo: '',
    image: null as File | null
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to report a lost item.",
        variant: "destructive"
      });
      return;
    }

    // Validation
    if (!formData.name || !formData.description || !formData.category || !formData.date || !formData.location || !formData.contactInfo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = null;

      // Handle image upload if present
      if (formData.image) {
        // For now, we'll create a data URL for the image
        // In a real app, you'd upload to storage and get a URL
        const reader = new FileReader();
        imageUrl = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(formData.image!);
        });
      }

      const { error } = await supabase
        .from('lost_items')
        .insert({
          user_id: user.id,
          name: formData.name,
          description: formData.description,
          category: formData.category as ItemCategory,
          date_lost: formData.date,
          location: formData.location,
          contact_info: formData.contactInfo,
          image_url: imageUrl,
        });

      if (error) throw error;

      toast({
        title: "Item Reported",
        description: "Your lost item has been reported successfully. We'll notify you if someone finds it!",
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        date: '',
        location: '',
        contactInfo: '',
        image: null
      });

      // Redirect to lost items page
      navigate('/lost-items');
    } catch (error) {
      console.error('Error reporting lost item:', error);
      toast({
        title: "Error",
        description: "Failed to report your lost item. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Report Lost Item</h1>
          <p className="text-gray-600">Help us help you find your lost item</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Lost Item Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Item Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., iPhone 13, Blue Backpack"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Provide detailed description including color, brand, distinctive features..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as ItemCategory }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="date">Date Lost *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location Lost *</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="e.g., Library 2nd Floor, Cafeteria, Gym"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="contactInfo">Contact Information *</Label>
                <Input
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                  placeholder="Email or phone number"
                  required
                />
              </div>

              <ImageUpload
                onImageSelect={(file) => setFormData(prev => ({ ...prev, image: file }))}
                selectedImage={formData.image}
              />

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={submitting}
              >
                {submitting ? 'Reporting...' : 'Report Lost Item'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportLost;
