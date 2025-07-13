
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type ItemCategory = Database['public']['Enums']['item_category'];

export interface LostItemFormData {
  name: string;
  description: string;
  category: ItemCategory | '';
  date: string;
  location: string;
  contactInfo: string;
  image: File | null;
}

export const useReportLostForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<LostItemFormData>({
    name: '',
    description: '',
    category: '',
    date: '',
    location: '',
    contactInfo: '',
    image: null
  });

  const validateForm = (): boolean => {
    if (!formData.name || !formData.description || !formData.category || !formData.date || !formData.location || !formData.contactInfo) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

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

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      let imageUrl = null;

      // Handle image upload if present
      if (formData.image) {
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

  return {
    formData,
    setFormData,
    submitting,
    handleSubmit
  };
};
