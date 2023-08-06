import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/homePage";
import SingleCoin from "./pages/singleCoinPage";
import Exchanges from "./pages/exchangesPage";
import SingleExchange from "./pages/singleExchangePage";
import NotFound from "./pages/notFound";
import { Navigate } from "react-router-dom";

const msRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/assets/:id",
        element: <SingleCoin />,
    },
    {
        path: "/exchanges",
        element: <Exchanges />,
    },
    {
        path: "/exchanges/:id",
        element: <SingleExchange />,
    },
    {
        path: "/notfound",
        element: <NotFound />,
    },
    {
        path: "*",
        element: <Navigate to="/notfound" replace />,
    },
]);
export default function MyRouter() {
    return (
        <RouterProvider router={msRouter} />
    )
}