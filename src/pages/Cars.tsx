
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car, Search, Filter, ArrowLeft, X, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllCars } from "@/services/carService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Cars = () => {
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const [cars, setCars] = useState<any[]>([]);
  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [yearRange, setYearRange] = useState("");
  const [makeFilter, setMakeFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const fetchCars = async () => {
    try {
      const carsData = await getAllCars();
      console.log("Fetched cars:", carsData);
      setCars(carsData);
      setFilteredCars(carsData);
    } catch (error) {
      console.error("Error fetching cars:", error);
      toast({
        title: "Error",
        description: "Failed to load cars. Please make sure your backend is running on port 2026.",
        variant: "destructive",
      });
      // Fallback to sample data if backend is not available
      const sampleData = [
        {
          id: 1,
          name: "Lexus GX 570",
          make: "Lexus",
          model: "GX",
          year: 2023,
          mileage: 12500,
          price: 75999,
          images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop"]
        },
        {
          id: 2,
          name: "BMW X5",
          make: "BMW",
          model: "X5",
          year: 2022,
          mileage: 25000,
          price: 62000,
          images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop"]
        },
        {
          id: 3,
          name: "Mercedes-Benz C-Class",
          make: "Mercedes-Benz",
          model: "C-Class",
          year: 2021,
          mileage: 18000,
          price: 45000,
          images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop"]
        }
      ];
      setCars(sampleData);
      setFilteredCars(sampleData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    let filtered = cars;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply make filter
    if (makeFilter) {
      filtered = filtered.filter(car => car.make === makeFilter);
    }

    // Apply price range filter
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(car => {
        if (max) {
          return car.price >= min && car.price <= max;
        } else {
          return car.price >= min;
        }
      });
    }

    // Apply year range filter
    if (yearRange) {
      const [min, max] = yearRange.split('-').map(Number);
      filtered = filtered.filter(car => {
        if (max) {
          return car.year >= min && car.year <= max;
        } else {
          return car.year >= min;
        }
      });
    }

    setFilteredCars(filtered);
  }, [cars, searchTerm, makeFilter, priceRange, yearRange]);

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange("");
    setYearRange("");
    setMakeFilter("");
    setShowFilters(false);
  };

  const uniqueMakes = [...new Set(cars.map(car => car.make).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

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
              {!isAuthenticated && (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/signin">Sign In</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/admin">Admin</Link>
                  </Button>
                </>
              )}
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

        {isAuthenticated && (
          <div className="mb-8 text-center">
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" asChild>
              <Link to="/admin">
                <Plus className="h-4 w-4 mr-2" />
                Add Car
              </Link>
            </Button>
          </div>
        )}

        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Search by make, model, or keyword..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </div>

                {showFilters && (
                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Make</label>
                        <Select value={makeFilter} onValueChange={setMakeFilter}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Make" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any Make</SelectItem>
                            {uniqueMakes.map(make => (
                              <SelectItem key={make} value={make}>{make}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Price Range</label>
                        <Select value={priceRange} onValueChange={setPriceRange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Price" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any Price</SelectItem>
                            <SelectItem value="0-25000">Under $25,000</SelectItem>
                            <SelectItem value="25000-50000">$25,000 - $50,000</SelectItem>
                            <SelectItem value="50000-75000">$50,000 - $75,000</SelectItem>
                            <SelectItem value="75000">$75,000+</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Year</label>
                        <Select value={yearRange} onValueChange={setYearRange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Any Year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">Any Year</SelectItem>
                            <SelectItem value="2023-2024">2023-2024</SelectItem>
                            <SelectItem value="2020-2022">2020-2022</SelectItem>
                            <SelectItem value="2015-2019">2015-2019</SelectItem>
                            <SelectItem value="2010-2014">2010-2014</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-end">
                        <Button variant="outline" onClick={clearFilters} className="w-full">
                          <X className="h-4 w-4 mr-2" />
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredCars.length} of {cars.length} cars
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src={car.images && car.images.length > 0 ? car.images[0] : "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop"}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{car.name}</h3>
                <p className="text-gray-600 mb-2">{car.year} • {car.mileage?.toLocaleString() || 0} miles</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${car.price?.toLocaleString() || 0}</span>
                  <Button size="sm" asChild>
                    <Link to={`/car/${car.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && cars.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No cars match your current filters.</p>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>
        )}

        {cars.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No cars found in the inventory.</p>
            <Button asChild>
              <Link to="/admin">Add Your First Car</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cars;
