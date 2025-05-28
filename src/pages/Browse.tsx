
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Car, Search, Filter, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Browse = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  E&T Motors
                </span>
              </div>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Our Inventory</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover your perfect vehicle from our extensive collection of quality cars.
          </p>
        </div>

        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by make, model, or keyword..."
                    className="pl-10"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <Car className="h-12 w-12 text-gray-400" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">Sample Car {i}</h3>
                <p className="text-gray-600 mb-2">2023 • 15,000 miles</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">$25,999</span>
                  <Button size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to sell your car?</p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            List Your Vehicle
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Browse;
