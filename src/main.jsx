import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import Navbar from "./landing_Page/Navbar.jsx";
import Footer from "./landing_Page/Footer.jsx";

import AppRoutes from "../routes/AppRoutes.jsx";

import ServiceProviderPage from "./landing_Page/serviceprovider/ServiceProviderPage.jsx";
import Admin from "./landing_Page/admin/Admin.jsx";
import LoginRoutes from "../routes/LoginRoutes.jsx"
import ProviderRoutes from "../routes/ProviderRoutes.jsx";
import SignupRoutes from "../routes/SignupRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>

    <Routes>

      {/* Normal HomiGo website */}
      <Route
        path="/*"
        element={
          <>
            <Navbar />

            <AppRoutes />

            <Footer />
          </>
        }
      />

      {/* Service Provider Dashboard */}
      <Route
        path="/provider/*"
        element={<ProviderRoutes />}
      />
      <Route
        path="/login/*"
        element={<LoginRoutes />}
      />
      <Route
        path="/signup/*"
        element={<SignupRoutes />}
      />
      <Route
        path="/admin"
        element={<Admin />}
      />

    </Routes>

  </BrowserRouter>
);