
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Car, Search, Filter, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Browse = () => {
  const sampleCars = [
    {
      id: 1,
      name: "Lexus GX 570",
      year: 2023,
      mileage: 12500,
      price: 75999,
      image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "BMW X5",
      year: 2022,
      mileage: 18000,
      price: 62999,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Mercedes-Benz GLE",
      year: 2023,
      mileage: 8500,
      price: 68999,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Audi Q7",
      year: 2022,
      mileage: 22000,
      price: 58999,
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      name: "Range Rover Sport",
      year: 2023,
      mileage: 15000,
      price: 82999,
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      name: "Porsche Cayenne",
      year: 2022,
      mileage: 11000,
      price: 78999,
      image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=400&h=300&fit=crop"
    }
  ];

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
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/admin">Admin</Link>
              </Button>
            </div>
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
          {sampleCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{car.name}</h3>
                <p className="text-gray-600 mb-2">{car.year} • {car.mileage.toLocaleString()} miles</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${car.price.toLocaleString()}</span>
                  <Button size="sm" asChild>
                    <Link to={`/car/${car.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to sell your car?</p>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" asChild>
            <Link to="/admin">List Your Vehicle</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Browse;
