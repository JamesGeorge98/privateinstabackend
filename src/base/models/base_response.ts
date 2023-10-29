export interface ApiResponse<T> {
    status: boolean;
    data?: T; // Use a generic type for the data field
    error?: string;
    message?: string; // Optional error message
  }

