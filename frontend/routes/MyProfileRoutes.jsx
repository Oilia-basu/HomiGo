import { Routes, Route } from "react-router-dom";
import MyProfile from "../src/landing_Page/myProfile/MyProfile";

const MyProfileRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MyProfile />} />
    </Routes>
  );
};

export default MyProfileRoutes;