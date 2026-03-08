export type User = {
    id: number;
    username: string;
    email: string;
    premium: boolean;    
};

export type AuthContextType = {
  user: User | null;  
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  loginWithUser: (user: User) => Promise<void>;
  logout: () => Promise<void>;
};