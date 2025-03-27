import {
  SignUpData,
  SignInData,
  User,
  AuthResponse,
  ErrorResponse,
} from '../../types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:4242';

class AuthService {
  private static readonly USER_KEY = 'user';
  private static instance: AuthService;
  private user: User | null = null;

  private constructor() {
    // Inicializar datos del usuario desde localStorage si existen
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem(AuthService.USER_KEY);
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

  private setUser(user: User): void {
    this.user = user;
    localStorage.setItem(AuthService.USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    return this.user;
  }

  public removeUser(): void {
    this.user = null;
    localStorage.removeItem(AuthService.USER_KEY);
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

  public async signUp(data: SignUpData): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      await this.handleResponse<AuthResponse>(response);
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
      this.setUser({ ...result.user, token: result.token });
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error during sign in');
    }
  }

  public async signOut(): Promise<void> {
    this.removeUser();
  }
}

export const authService = AuthService.getInstance();
