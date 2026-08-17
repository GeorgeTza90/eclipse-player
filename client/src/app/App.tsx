import AppRouter from "./Router";
import { BrowserRouter as Router } from "react-router-dom";
import { AudioProvider } from "@/contexts/AudioContextWeb";
import { LibraryProvider } from "@/contexts/LibraryContextWeb";
import { AuthProvider } from "@/contexts/AuthContextWeb.tsx";
import { ToastProvider } from "@/contexts/ToastContextWeb";
import { MiniPlayerProvider } from "@/contexts/MiniPlayerContextWeb";
import PrivacyGuard from "@/contexts/guards/PrivacyGuard.ts";

const App = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <LibraryProvider>
                    <AudioProvider>
                        <MiniPlayerProvider>
                            <PrivacyGuard />
                            <Router>
                                <AppRouter />
                            </Router>
                        </MiniPlayerProvider>
                    </AudioProvider>
                </LibraryProvider>
            </AuthProvider>
        </ToastProvider>
    );
}

export default App;