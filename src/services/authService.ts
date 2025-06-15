const API_BASE_URL = 'https://et-motors-backend.onrender.com/api/auth';

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
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
  user: UserResponse;
}

export const register = async (registerData: RegisterRequest): Promise<UserResponse> => {
  try {
    console.log('Registering user with data:', registerData);
    
    // Ensure all fields are properly trimmed and not null
    const cleanedData = {
      firstName: registerData.firstName.trim(),
      lastName: registerData.lastName.trim(),
      email: registerData.email.trim(),
      password: registerData.password,
      confirmPassword: registerData.confirmPassword
    };

    console.log('Cleaned registration data:', cleanedData);
    
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(cleanedData),
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
    console.log('Attempting login with email:', loginData.email);
    console.log('Login data received:', { email: loginData.email, passwordLength: loginData.password?.length });
    
    // Validate input data
    if (!loginData.email || !loginData.password) {
      throw new Error('Email and password are required');
    }

    // Ensure fields are properly trimmed and validated
    const cleanedData = {
      email: loginData.email.trim(),
      password: loginData.password
    };

    console.log('Sending login request with:', { email: cleanedData.email, passwordLength: cleanedData.password.length });
    
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(cleanedData),
    });

    console.log('Login response status:', response.status);
    console.log('Login response headers:', response.headers);
    
    // Get response text first to handle both JSON and plain text responses
    const responseText = await response.text();
    console.log('Login raw response:', responseText);
    
    if (!response.ok) {
      console.error('Login failed with status:', response.status);
      console.error('Login error response:', responseText);
      
      // Try to parse as JSON first, fallback to plain text
      let errorMessage;
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorData.error || responseText;
      } catch {
        errorMessage = responseText || `HTTP error! status: ${response.status}`;
      }
      
      throw new Error(errorMessage);
    }
    
    // Parse successful response
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Failed to parse login response as JSON:', parseError);
      throw new Error('Invalid response format from server');
    }
    
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

export const saveUserData = (userData: any): void => {
  localStorage.setItem('userData', JSON.stringify(userData));
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
