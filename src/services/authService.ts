
const API_BASE_URL = 'https://et-motors-backend.onrender.com/api/auth';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export const register = async (registerData: RegisterRequest): Promise<UserResponse> => {
  try {
    console.log('Registering user:', registerData);
    
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    console.log('Register response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Register error response:', errorText);
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully registered user:', data);
    return data;
  } catch (error) {
    console.error('Full register error details:', error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to backend server. Please make sure your Spring Boot application is running on Render.');
    }
    throw error;
  }
};

export const login = async (loginData: LoginRequest): Promise<LoginResponse> => {
  try {
    console.log('Logging in user:', loginData.email);
    
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    console.log('Login response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Login error response:', errorText);
      throw new Error(errorText || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Successfully logged in user:', data);
    return data;
  } catch (error) {
    console.error('Full login error details:', error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Cannot connect to backend server. Please make sure your Spring Boot application is running on Render.');
    }
    throw error;
  }
};

// Utility functions for token management
export const saveToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const removeToken = (): void => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};
