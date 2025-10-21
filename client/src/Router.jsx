import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/index";
import Player from "./pages/Player/index";
import Library from "./pages/Library/index";
import CollectionDetail from "./components/library/CollectionDetail";
import PlaylistDetail from "./components/library/PlaylistDetail";


function AppRouter() {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

                <Route path="/player" element={<Player />} />

                <Route path="/library" element={<Library />} />
                <Route path="/library/CollectionDetail" element={<CollectionDetail />} />
                <Route path="/library/PlaylistDetail" element={<PlaylistDetail />} />



                {/* <Route path="/profile" element={<Profile />} />                
                <Route path="/player/upload" element={<Uploader />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/store" element={<Store />} />
                <Route path="/purchase" element={<Home />} />
                
                <Route path="/search/:slug" element={<SearchDetail />} /> */}
            </Route>
        </Routes>
    );
}

export default AppRouter;
