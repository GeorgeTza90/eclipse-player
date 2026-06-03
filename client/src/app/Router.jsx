import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/index";
import Player from "../pages/Player/index";
import Library from "../pages/Library/index";
import CollectionDetail from "../components/library/CollectionDetail";
import PrivateCollectionDetail from "../components/library/PrivateCollectionDetail";
import PlaylistDetail from "../components/library/PlaylistDetail";
import ResetPassword from "../components/home/ResetPassword";
import ArtistDetail from "../components/library/ArtistDetail";
import NotFound from "../pages/NotFound/index";
import UserSettings from "../components/home/UserSettings";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="/user-settings" element={<UserSettings />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="/player" element={<Player />} />

                <Route path="/library" element={<Library />} />
                <Route path="/library/CollectionDetail/:album" element={<CollectionDetail />} />
                <Route path="/library/PrivateCollectionDetail/:album" element={<PrivateCollectionDetail />} />                
                <Route path="/library/ArtistInfo/:name" element={<ArtistDetail />} />
                <Route path="/library/PlaylistDetail" element={<PlaylistDetail />} />

                <Route path="*" element={<NotFound />} />

            </Route>
        </Routes>
    );
}

export default AppRouter;