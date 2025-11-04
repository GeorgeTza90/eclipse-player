import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/index";
import Player from "./pages/Player/index";
import Library from "./pages/Library/index";
import CollectionDetail from "./components/library/CollectionDetail";
import PlaylistDetail from "./components/library/PlaylistDetail";
import ResetPassword from "./components/home/ResetPassword";
import ArtistDetail from "./components/library/ArtistDetail";


function AppRouter() {

    return (
        <Routes>
            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/player" element={<Player />} />

                <Route path="/library" element={<Library />} />
                <Route path="/library/CollectionDetail" element={<CollectionDetail />} />
                <Route path="/library/PlaylistDetail" element={<PlaylistDetail />} />
                <Route path="/library/ArtistInfo" element={<ArtistDetail />} />

            </Route>
        </Routes>
    );
}

export default AppRouter;
