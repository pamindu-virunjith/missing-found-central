
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Eye, Users, MapPin, Bell } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            University Lost & Found
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect lost items with their owners. Report what you've lost or found, 
            and help build a more connected campus community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to="/report-lost">
                <Plus className="mr-2 h-5 w-5" />
                Report Lost Item
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/report-found">
                <Search className="mr-2 h-5 w-5" />
                Report Found Item
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Quick Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/lost-items">
                <CardHeader className="text-center">
                  <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>Browse Lost Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    See what others have lost and help them find their items
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/found-items">
                <CardHeader className="text-center">
                  <Search className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <CardTitle>Browse Found Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Check if someone has found your lost item
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/report-lost">
                <CardHeader className="text-center">
                  <Plus className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <CardTitle>Report Lost</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Tell us about something you've lost
                  </p>
                </CardContent>
              </Link>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link to="/report-found">
                <CardHeader className="text-center">
                  <Plus className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <CardTitle>Report Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    Help return something to its owner
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Coming Soon Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">User Accounts</h3>
              <p className="text-gray-600">
                Create your profile to track your reported items and receive personalized notifications
              </p>
            </div>

            <div className="text-center">
              <Bell className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
              <p className="text-gray-600">
                Get automatically notified when someone reports an item that matches your lost item
              </p>
            </div>

            <div className="text-center">
              <MapPin className="h-16 w-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Campus Map</h3>
              <p className="text-gray-600">
                View lost and found items on an interactive campus map for better location awareness
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Making a Difference
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-gray-600">Items Reported</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">89%</div>
              <div className="text-gray-600">Items Reunited</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Happy Students</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
