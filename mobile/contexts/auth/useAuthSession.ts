import { UseAuthSessionProps, User } from "@/types/auth";
import { setJSON, removeItem } from "@/utils/localStorageManager";



export function useAuthSession({ postCall, setUser }: UseAuthSessionProps) {
    const loginWithUser = async (user: User) => {
        if (!user) return;
        setUser(user);
        await setJSON("user", user);
    };

    const logout = async () => {
        try { await postCall("logoutUser"); } catch {}
        setUser(null);
        await removeItem("user");
    };

    return { loginWithUser, logout };
}