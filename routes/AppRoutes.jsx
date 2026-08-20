import { Routes, Route } from "react-router-dom";

import Home from "../src/landing_Page/home/Home.jsx";
import MyBookingPage from "../src/landing_Page/mybookings/MyBookingPage.jsx";
import NotFound from "../src/landing_Page/NotFound.jsx";
import Support from "../src/landing_Page/support/Support.jsx";
import CareersPage from "../src/landing_Page/careers/CareersPage.jsx";
import Admin from "../src/landing_Page/admin/Admin.jsx";
import ServicePage from "../src/landing_Page/services/ServicePage.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/support" element={<Support />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/mybookings" element={<MyBookingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;