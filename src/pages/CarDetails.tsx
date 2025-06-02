import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Share2, Phone, Mail } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCarById } from "@/services/carService";
import { useToast } from "@/hooks/use-toast";

const CarDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const { toast } = useToast();
  const [car, setCar] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) {
        setError("No car ID provided");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const data = await getCarById(id);
        setCar(data);
      } catch (err) {
        console.error("Error fetching car:", err);
        setError("Failed to load car details. Please try again or ensure the backend is running on port 2026.");
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Car not found"}</p>
          <Button asChild>
            <Link to="/browse">Back to Browse</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/browse">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={car.images && car.images.length > 0 ? car.images[selectedImage] : "https://via.placeholder.com/800x600?text=No+Image"}
                alt={`${car.name} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {car.images && car.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-video overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${car.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Car Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{car.name}</h1>
                <Badge variant="secondary">{car.condition}</Badge>
              </div>
              <p className="text-2xl font-bold text-blue-600">${car.price?.toLocaleString() || 0}</p>
              <p className="text-gray-600">{car.year} • {car.mileage?.toLocaleString() || 0} miles</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Vehicle Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Make:</span>
                    <span className="ml-2 font-medium">{car.make}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Model:</span>
                    <span className="ml-2 font-medium">{car.model}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Year:</span>
                    <span className="ml-2 font-medium">{car.year}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Color:</span>
                    <span className="ml-2 font-medium">{car.color}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Transmission:</span>
                    <span className="ml-2 font-medium">{car.transmission}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fuel Type:</span>
                    <span className="ml-2 font-medium">{car.fuelType}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Engine:</span>
                    <span className="ml-2 font-medium">{car.engine}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Drivetrain:</span>
                    <span className="ml-2 font-medium">{car.drivetrain}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features && car.features.split(",").map((feature: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {feature.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Description</h3>
                <p className="text-gray-700">{car.description}</p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Phone className="h-4 w-4 mr-2" />
                Call Dealer
              </Button>
              <Button variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CarDetails;