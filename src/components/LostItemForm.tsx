
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';
import ImageUpload from '@/components/ImageUpload';
import { LostItemFormData } from '@/hooks/useReportLostForm';

type ItemCategory = Database['public']['Enums']['item_category'];

const categories: ItemCategory[] = ["Electronics", "Bags", "Accessories", "Books", "Clothing", "Other"];

interface LostItemFormProps {
  formData: LostItemFormData;
  setFormData: React.Dispatch<React.SetStateAction<LostItemFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
}

const LostItemForm = ({ formData, setFormData, onSubmit, submitting }: LostItemFormProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Lost Item Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
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
  );
};

export default LostItemForm;
