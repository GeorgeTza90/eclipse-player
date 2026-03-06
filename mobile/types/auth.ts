export type User = {
    id: number;
    username: string;
    email: string;
    premium: boolean;    
};

export type AuthContextType = {
  user: User | null;  
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};