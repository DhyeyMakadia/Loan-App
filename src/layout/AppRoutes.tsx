import Loader from "components/Loader";
import { FC, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "shared/constants/routes";

const LoginPage = lazy(() => import("pages/Login/index"));

const RegisterPage = lazy(() => import("pages/Register/index"));

const FormPage = lazy(() => import("pages/Form/index"));

const AppRoutes: FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORM} element={<FormPage />} />

        {/* keep least always */}
        <Route path="*" element={<>Page not found</>} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;
