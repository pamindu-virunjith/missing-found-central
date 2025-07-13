
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useReportLostForm } from '@/hooks/useReportLostForm';
import LostItemForm from '@/components/LostItemForm';

const ReportLost = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { formData, setFormData, submitting, handleSubmit } = useReportLostForm();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

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

        <LostItemForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      </div>
    </div>
  );
};

export default ReportLost;
