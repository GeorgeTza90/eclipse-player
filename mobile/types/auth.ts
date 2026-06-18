export type User = {
    id: number;
    username: string;
    email: string;
    premium: boolean;
    private: boolean;
};

export type AuthContextType = {
  user: User | null; 
  priv_u: Boolean 
  loading: boolean;  
  loginWithUser: (user: User) => Promise<void>;
  logout: () => Promise<void>;
};