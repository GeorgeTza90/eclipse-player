import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Router";
import { AudioProvider } from "./contexts/AudioContextWeb";
import { LibraryProvider } from "./contexts/LibraryContextWeb";
import { AuthProvider } from "./contexts/AuthContextWeb";
import { ToastProvider } from "./contexts/ToastContextWeb";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <LibraryProvider>
          <AudioProvider>
            <Router>
              <AppRouter />
            </Router>
          </AudioProvider>
        </LibraryProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;