import { FC, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "shared/constants/routes";

const LoginPage = lazy(
  () => import("pages/Login/index")
);

const RegisterPage = lazy(
  () => import("pages/Register/index")
);

const AppRoutes: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

      {/* keep least always */}
      <Route path="*" element={<>Page not found</>} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
