
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Eye, Plus, Users, Shield, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Lost & Found
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Reuniting people with their belongings through community collaboration
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/lost-items">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-3">
                  <Eye className="mr-2 h-5 w-5" />
                  Browse Lost Items
                </Button>
              </Link>
              <Link to="/found-items">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-3">
                  <Eye className="mr-2 h-5 w-5" />
                  Browse Found Items
                </Button>
              </Link>
            </div>

            {!user && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
                <p className="text-gray-700 mb-4">Ready to report a lost or found item?</p>
                <Link to="/auth">
                  <Button variant="secondary" size="lg" className="w-full">
                    Sign In / Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to report and find lost items in your community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Search Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Browse through lost and found items with powerful search and filtering options
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Plus className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Report Items</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Easily report lost or found items with detailed descriptions and photos
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Get in touch with item owners or finders through secure contact methods
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <CardTitle>Stay Safe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                All interactions are secure and your personal information is protected
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Lost Something?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Report your lost item and let the community help you find it.
              </p>
              {user ? (
                <Link to="/report-lost">
                  <Button variant="secondary" size="lg">
                    Report Lost Item
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="secondary" size="lg">
                    Sign In to Report
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Found Something?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Help someone by reporting an item you've found.
              </p>
              {user ? (
                <Link to="/report-found">
                  <Button variant="secondary" size="lg">
                    Report Found Item
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button variant="secondary" size="lg">
                    Sign In to Report
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">24/7</div>
              <p className="text-gray-600">Always Available</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
              <p className="text-gray-600">Free to Use</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">
                <Clock className="h-10 w-10 inline" />
              </div>
              <p className="text-gray-600">Quick Response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
