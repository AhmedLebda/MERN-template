import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <>
            <div>NavBar</div>
            <Outlet></Outlet>
            <div>Footer</div>
        </>
    );
};

export default MainLayout;
