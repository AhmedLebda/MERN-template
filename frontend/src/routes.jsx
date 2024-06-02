import MainLayout from "./pages/layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Error from "./pages/404";

const routes = [
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
        ],
    },
];

export default routes;
