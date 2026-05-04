import AppRouter from "./Router";
import { BrowserRouter as Router } from "react-router-dom";
import { AudioProvider } from "./contexts/AudioContextWeb";
import { LibraryProvider } from "./contexts/LibraryContextWeb";
import { AuthProvider } from "./contexts/AuthContextWeb";
import { ToastProvider } from "./contexts/ToastContextWeb";
import { MiniPlayerProvider } from "./contexts/MiniPlayerContextWeb";

const App = () => {
    return (
        <ToastProvider>
            <AuthProvider>
                <LibraryProvider>
                    <AudioProvider>
                        <MiniPlayerProvider>
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