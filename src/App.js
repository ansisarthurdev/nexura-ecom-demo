import React, { useEffect } from "react";

import "./global.css";
import { Theme } from "@radix-ui/themes";

//router
import { Routes, Route, Outlet, useLocation, Navigate } from "react-router-dom";

// //components
import Header from "./components/Header";
// import Footer from "./components/Footer";

//pages
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, [pathname]);

    return null;
  }

  return (
    <Theme
      appearance={"light"}
      accentColor={"gray"}
      grayColor={"mauve"}
      radius="full"
    >
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <Header />
              <Outlet />
              {/* <Footer /> */}
            </div>
          }
        >
          <Route path="/" element={<ProductsPage />} />
          <Route path="/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>

      <ScrollToTop />
    </Theme>
  );
}

export default App;
