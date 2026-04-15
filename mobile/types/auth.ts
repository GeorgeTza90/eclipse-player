export type User = {
    id: number;
    username: string;
    email: string;
    premium: boolean;    
    password: string;
};

export type AuthContextType = {
  user: User | null;  
  loading: boolean;  
  loginWithUser: (user: User) => Promise<void>;
  logout: () => Promise<void>;
};