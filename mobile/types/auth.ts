import { useFetchManager, usePostManager } from "@/hooks/useCallManager";

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

export interface UseAuthUserProps {
    fetchCall: ReturnType<typeof useFetchManager>["call"];
    setUser: (user: User | null) => void;
}

export interface UseAuthSessionProps {
    postCall: ReturnType<typeof usePostManager>["call"];
    setUser: (user: User | null) => void;
}