import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav"
import Footer from "./Footer/Footer"

const MainLayout = () => {
    return (
        <>
            <Nav hid={false} />
            <main className="body" style={{marginTop: "5rem" }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
