import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Suspense } from "react";
import FallBackLoader from "./Components/FallBackLoader";
// import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      {/* <AuthProvider> */}
        <Router>
          <Suspense fallback={<FallBackLoader />}>
          <AppRoutes />
          </Suspense>
          <ToastContainer position="top-center" autoClose={5000} />
        </Router>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
