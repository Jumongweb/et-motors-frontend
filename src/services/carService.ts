
const API_BASE_URL = 'http://localhost:2026/api/v1/cars';

export interface CarData {
  name: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  engine: string;
  transmission: string;
  fuelType: string;
  driveTrain: string;
  vin: string;
  type: string;
  isAvailable: boolean;
  description: string;
  features: string;
  images?: File[];
}

export const addCar = async (carData: CarData): Promise<any> => {
  const formData = new FormData();
  
  // Add all car data to FormData
  formData.append('name', carData.name);
  formData.append('make', carData.make);
  formData.append('model', carData.model);
  formData.append('year', carData.year.toString());
  formData.append('price', carData.price.toString());
  formData.append('mileage', carData.mileage.toString());
  formData.append('color', carData.color);
  formData.append('engine', carData.engine);
  formData.append('transmission', carData.transmission);
  formData.append('fuelType', carData.fuelType);
  formData.append('driveTrain', carData.driveTrain);
  formData.append('vin', carData.vin);
  formData.append('type', carData.type);
  formData.append('isAvailable', carData.isAvailable.toString());
  formData.append('description', carData.description);
  formData.append('features', carData.features);
  
  // Add images if they exist
  if (carData.images) {
    carData.images.forEach((image) => {
      formData.append('images', image);
    });
  }

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const getAllCars = async (): Promise<any[]> => {
  const response = await fetch(API_BASE_URL);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

export const getCarById = async (id: string): Promise<any> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};
