import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/index";
import Player from "../pages/Player/index";
import Library from "../pages/Library/index";
import CollectionDetail from "../components/library/details/CollectionDetail";
import PrivateCollectionDetail from "../components/library/details/PrivateCollectionDetail";
import PlaylistDetail from "../components/library/details/PlaylistDetail";
import ResetPassword from "../components/home/auth/ResetPassword";
import ArtistDetail from "../components/library/details/ArtistDetail";
import Settings from "../components/home/settings/Settings";
import NotFound from "../pages/NotFound/index";


const AppRouter = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>

                <Route path="/" element={<Home />} />
                <Route path="/user-settings" element={<Settings />} />
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