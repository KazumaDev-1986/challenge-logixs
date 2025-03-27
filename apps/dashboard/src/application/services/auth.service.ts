const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4242';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface ValidationError {
  target: Record<string, any>;
  value: string;
  property: string;
  children: any[];
  constraints: Record<string, string>;
}

interface ErrorResponse {
  error: string;
  details?: ValidationError[];
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private user: User | null = null;

  private constructor() {
    // Inicializar el token y datos del usuario desde localStorage si existen
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
      }
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  private setUser(user: User): void {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getToken(): string | null {
    return this.token;
  }

  public getUser(): User | null {
    return this.user;
  }

  public removeToken(): void {
    this.token = null;
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();

    if (!response.ok) {
      const errorResponse = data as ErrorResponse;

      if (errorResponse.details) {
        // Si hay errores de validación, concatenamos todos los mensajes
        const validationMessages = errorResponse.details
          .map((error) => {
            if (error.constraints) {
              return Object.values(error.constraints).join(', ');
            }
            return '';
          })
          .filter(Boolean)
          .join(', ');

        throw new Error(validationMessages || errorResponse.error);
      }

      throw new Error(errorResponse.error || 'An error occurred');
    }

    return data as T;
  }

  public async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse<AuthResponse>(response);
      this.setToken(result.token);
      this.setUser(result.user);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error during sign up');
    }
  }

  public async signIn(data: SignInData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await this.handleResponse<AuthResponse>(response);
      this.setToken(result.token);
      this.setUser(result.user);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error during sign in');
    }
  }

  public async signOut(): Promise<void> {
    this.removeToken();
  }
}

export const authService = AuthService.getInstance();
