import "./App.css";
import { BasketProvider } from "./context/basketLengthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./pages/aboutUs/AboutUs";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import "./font.css";
import Thanks from "./pages/thanks/Thanks";
import Privacy from "./pages/privacy/Privacy";
import Terms from "./pages/terms/Terms";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AboutUs />,
    },
    {
      path: "/menu",
      element: <Menu />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/thanks",
      element: <Thanks />,
    },
    {
      path: "/privacy",
      element: <Privacy />,
    },
    {
      path: "/terms",
      element: <Terms />,
    },
  ]);
  return (
    <BasketProvider>
      <RouterProvider router={router} />
    </BasketProvider>
  );
}

export default App;
