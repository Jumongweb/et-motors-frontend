import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Car, Upload, X, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { addCar, CarData } from "@/services/carService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Admin = () => {
  const { toast } = useToast();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: "Access Denied",
        description: "You must be logged in to add cars. Please sign in first.",
        variant: "destructive",
      });
      navigate("/signin");
    }
  }, [isAuthenticated, loading, navigate, toast]);

  const [formData, setFormData] = useState({
    name: "",
    make: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    transmission: "AUTOMATIC",
    fuelType: "GASOLINE",
    engine: "",
    driveTrain: "FWD",
    vin: "",
    type: "SUV",
    description: "",
    features: ""
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      
      setImages(prev => [...prev, ...newFiles]);
      setImagePreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      const newPreviews = prev.filter((_, i) => i !== index);
      // Clean up the URL object
      URL.revokeObjectURL(prev[index]);
      return newPreviews;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const carData: CarData = {
        name: formData.name,
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        price: parseFloat(formData.price),
        mileage: parseInt(formData.mileage),
        color: formData.color,
        engine: formData.engine,
        transmission: formData.transmission,
        fuelType: formData.fuelType,
        driveTrain: formData.driveTrain,
        vin: formData.vin,
        type: formData.type,
        isAvailable: true,
        description: formData.description,
        features: formData.features,
        images: images
      };

      console.log("Submitting car data:", carData);
      const response = await addCar(carData);
      console.log("Car added successfully:", response);
      
      toast({
        title: "Success!",
        description: "Car has been added successfully.",
      });

      // Reset form
      setFormData({
        name: "",
        make: "",
        model: "",
        year: "",
        price: "",
        mileage: "",
        color: "",
        transmission: "AUTOMATIC",
        fuelType: "GASOLINE",
        engine: "",
        driveTrain: "FWD",
        vin: "",
        type: "SUV",
        description: "",
        features: ""
      });
      setImages([]);
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding car:", error);
      toast({
        title: "Error",
        description: "Failed to add car. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600 mb-6">You must be logged in to add cars to the inventory.</p>
            <div className="space-y-2">
              <Button className="w-full" asChild>
                <Link to="/signin">Sign In</Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/cars">Browse Cars</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                E&T Motors Admin
              </span>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/browse">Back to Browse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Add New Car</h1>
            <p className="text-xl text-gray-600">Fill out the form below to add a new car to the inventory</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Car Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Car Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Lexus GX 570"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="make">Make</Label>
                    <Input
                      id="make"
                      name="make"
                      value={formData.make}
                      onChange={handleInputChange}
                      placeholder="e.g., Lexus"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Model</Label>
                    <Input
                      id="model"
                      name="model"
                      value={formData.model}
                      onChange={handleInputChange}
                      placeholder="e.g., GX 570"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      name="year"
                      type="number"
                      value={formData.year}
                      onChange={handleInputChange}
                      placeholder="2023"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="75999"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Mileage</Label>
                    <Input
                      id="mileage"
                      name="mileage"
                      type="number"
                      value={formData.mileage}
                      onChange={handleInputChange}
                      placeholder="12500"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      placeholder="Pearl White"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engine">Engine</Label>
                    <Input
                      id="engine"
                      name="engine"
                      value={formData.engine}
                      onChange={handleInputChange}
                      placeholder="4.6L V8"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vin">VIN</Label>
                    <Input
                      id="vin"
                      name="vin"
                      value={formData.vin}
                      onChange={handleInputChange}
                      placeholder="1HGBH41JXMN109186"
                      required
                    />
                  </div>
                </div>

                {/* Dropdowns */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transmission">Transmission</Label>
                    <select
                      id="transmission"
                      name="transmission"
                      value={formData.transmission}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="AUTOMATIC">Automatic</option>
                      <option value="MANUAL">Manual</option>
                      <option value="CVT">CVT</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Fuel Type</Label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      value={formData.fuelType}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="GASOLINE">Gasoline</option>
                      <option value="DIESEL">Diesel</option>
                      <option value="HYBRID">Hybrid</option>
                      <option value="ELECTRIC">Electric</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="driveTrain">Drivetrain</Label>
                    <select
                      id="driveTrain"
                      name="driveTrain"
                      value={formData.driveTrain}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="FWD">FWD</option>
                      <option value="RWD">RWD</option>
                      <option value="AWD">AWD</option>
                      <option value="FOUR_WHEEL_DRIVE">4WD</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Car Type</Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="SUV">SUV</option>
                      <option value="SEDAN">Sedan</option>
                      <option value="COUPE">Coupe</option>
                      <option value="HATCHBACK">Hatchback</option>
                      <option value="TRUCK">Truck</option>
                      <option value="CONVERTIBLE">Convertible</option>
                    </select>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Textarea
                    id="features"
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    placeholder="Leather Seats, Navigation System, Backup Camera, Heated Seats"
                    rows={3}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed description of the vehicle..."
                    rows={4}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Car Images (Upload up to 5 images)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-4">
                        <label htmlFor="images" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-gray-900">
                            Click to upload images
                          </span>
                          <input
                            id="images"
                            name="images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="sr-only"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? "Adding Car..." : "Add Car to Inventory"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
