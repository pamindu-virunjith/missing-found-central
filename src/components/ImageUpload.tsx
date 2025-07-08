
import { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
  label?: string;
}

const ImageUpload = ({ onImageSelect, selectedImage, label = "Photo (Optional)" }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      onImageSelect(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect(null);
    // Reset input value
    const input = document.getElementById('image') as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <div>
      <Label htmlFor="image">{label}</Label>
      {preview ? (
        <div className="relative border-2 border-gray-300 rounded-lg p-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-md"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label htmlFor="image" className="cursor-pointer">
            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              {selectedImage ? selectedImage.name : 'Click to upload an image'}
            </p>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
