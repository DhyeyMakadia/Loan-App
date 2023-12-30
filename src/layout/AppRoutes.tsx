import Loader from "components/Loader";
import { FC, Suspense, lazy } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { ROUTES } from "shared/constants/routes";

const LoginPage = lazy(() => import("pages/Login/index"));
const DashboardPage = lazy(() => import("pages/Dashboard/index"));

// const RegisterPage = lazy(() => import("pages/Register/index"));

const FormPage = lazy(() => import("pages/Form/index"));

const AppRoutes: FC = () => (
  <HashRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<DashboardPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        {/* <Route path={ROUTES.REGISTER} element={<RegisterPage />} /> */}
        <Route path={ROUTES.FORM} element={<FormPage />} />

        {/* keep least always */}
        <Route path="*" element={<>Page not found</>} />
      </Routes>
    </Suspense>
  </HashRouter>
);

export default AppRoutes;
