export type User = {
    id: number;
    username: string;
    email: string;
    premium: boolean;
    token: string;
};

export type AuthContextType = {
    user: User | null;
    token: string | null;
    login: (user: User, token: string) => void;
    logout: () => void;
};