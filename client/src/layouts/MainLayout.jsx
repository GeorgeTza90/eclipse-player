import { Outlet } from "react-router-dom";
import Nav from "./Nav/Nav"
import Footer from "./Footer/Footer"

const MainLayout = () => {
    return (
        <>
            <Nav hid={false} /><br /><br /><br /><br />
            <main className="body">
                <Outlet />
            </main><br /><br /><br /><br />
            <Footer />
        </>
    );
};

export default MainLayout;
