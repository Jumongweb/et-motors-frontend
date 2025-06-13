
const API_BASE_URL = 'https://et-motors-backend.onrender.com/api/v1/cars';

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

  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Backend server is not reachable. Please check if your Render deployment is running.');
    }
    throw error;
  }
};

export const getAllCars = async (): Promise<any[]> => {
  try {
    console.log('Fetching cars from:', API_BASE_URL);
    
    const response = await fetch(API_BASE_URL, {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully fetched cars:', data);
    return data;
  } catch (error) {
    console.error('Full error details:', error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to backend server. Please make sure your Render deployment is running and accessible.');
    }
    throw error;
  }
};

export const getCarById = async (id: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching car:', error);
    throw error;
  }
};

export const searchCars = async (query: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching cars:', error);
    throw error;
  }
};

export const deleteCar = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting car:', error);
    throw error;
  }
};

// Additional search endpoints based on your backend
export const getAvailableCars = async (): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/available`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching available cars:', error);
    throw error;
  }
};

export const getCarsByType = async (type: string): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/type/${encodeURIComponent(type)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cars by type:', error);
    throw error;
  }
};

export const getCarsByPriceRange = async (min: number, max: number): Promise<any[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/price-range?min=${min}&max=${max}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching cars by price range:', error);
    throw error;
  }
};
