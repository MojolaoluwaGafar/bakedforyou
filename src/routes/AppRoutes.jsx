import React from 'react'
import { Routes, Route } from "react-router-dom";
const Landing = React.lazy(()=> import("../Components/Landing"))
const AuthOption = React.lazy(() => import("../Components/AuthOption"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const SignUpPage = React.lazy(() => import("../pages/SignUpPage"));
const UploadProduct = React.lazy(()=> import("../Components/UploadProduct"));
const VerifyEmail = React.lazy(() => import("../pages/VerifyEmailPage"));




export default function AppRoutes() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<AuthOption />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/upload-product" element={<UploadProduct />} />
            <Route path="/verify-email/:email/:token" element={<VerifyEmail />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
    </>
  )
}
