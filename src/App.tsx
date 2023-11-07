import "./App.css";
import { ToastProvider } from "react-toast-notifications";
import AppRoutes from "layout/AppRoutes";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <ToastProvider placement="bottom-right" autoDismiss>
      <HelmetProvider>
        <AppRoutes />
      </HelmetProvider>
    </ToastProvider>
  );
}

export default App;
