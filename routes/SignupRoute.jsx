import { Routes, Route } from "react-router-dom";

import Signup from "../src/landing_Page/Signup";


const SignupRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
    </Routes>
  );
};

export default SignupRoutes;