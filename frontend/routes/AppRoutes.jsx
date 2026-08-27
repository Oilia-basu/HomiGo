
import { Routes, Route } from "react-router-dom";

import Home from "../src/landing_Page/home/Home.jsx";
import MyBookingPage from "../src/landing_Page/mybookings/MyBookingPage.jsx";
import NotFound from "../src/landing_Page/NotFound.jsx";
import Support from "../src/landing_Page/support/Support.jsx";
import CareersPage from "../src/landing_Page/careers/CareersPage.jsx";
import ServicePage from "../src/landing_Page/services/ServicePage.jsx";

import { GeneralContextProvider } from "../src/landing_Page/services/GeneralContext.jsx";


const AppRoutes = () => {
  return (
    <GeneralContextProvider>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Services */}
        <Route
          path="/services"
          element={<ServicePage />}
        />

        {/* Service Categories */}
        <Route
          path="/acrepair"
          element={<ServicePage />}
        />

        <Route
          path="/cleaning"
          element={<ServicePage />}
        />

        <Route
          path="/salon"
          element={<ServicePage />}
        />

        <Route
          path="/electrician"
          element={<ServicePage />}
        />

        <Route
          path="/plumbing"
          element={<ServicePage />}
        />

        <Route
          path="/painting"
          element={<ServicePage />}
        />

        <Route
          path="/appliancerepair"
          element={<ServicePage />}
        />

        <Route
          path="/pestcontrol"
          element={<ServicePage />}
        />

        {/* Other Pages */}
        <Route
          path="/support"
          element={<Support />}
        />

        <Route
          path="/careers"
          element={<CareersPage />}
        />

        <Route
          path="/mybookings"
          element={<MyBookingPage />}
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>

    </GeneralContextProvider>
  );
};

export default AppRoutes;

