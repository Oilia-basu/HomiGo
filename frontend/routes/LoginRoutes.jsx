import { Routes, Route } from "react-router-dom";
import Login from "../src/landing_Page/Login";


const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
};

export default LoginRoutes;