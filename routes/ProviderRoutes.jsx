import { Routes, Route } from "react-router-dom";
import ServiceProviderPage from "../src/landing_Page/serviceprovider/ServiceProviderPage";


const ProviderRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ServiceProviderPage />} />
    </Routes>
  );
};

export default ProviderRoutes;