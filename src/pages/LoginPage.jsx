import React, { useState, useEffect } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import Button from "../Components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [showResend, setShowResend] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("verified") === "true") {
      toast.success("✅ Email verified! You can now log in.");
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { email, password } = formData;

    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";

    if (!password.trim()) newErrors.password = "Password is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setShowResend(false);

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // const data = await res.json();
      
    let data;
    try {
      data = await res.json();
    } catch (err) {
      console.error("Failed to parse response JSON:", err);
      throw new Error("Invalid response from server.");
    }
    console.log("Login response:", data);
    
      if (res.ok) {
        toast.success("Login successful!");
        navigate("/dashboard");
      } else {
        if (res.status === 403) {
          const msg = data.message?.toLowerCase() || "";
          if (msg.includes("verify")) {
            setSubmitError("You need to verify your email before logging in.");
            setShowResend(true);
          } else if (msg.includes("approval")) {
            setSubmitError("Your account is pending admin approval.");
          } else {
            setSubmitError(data.message || "Access denied.");
          }
        } else {
          setSubmitError(data.message || "Login failed. Try again.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setSubmitError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerification = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/user/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Verification email resent!");
    } catch (error) {
      console.error("Resend failed:", error.message);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 bg-transparent">
        {submitError && (
          <div className="text-red-600 font-semibold mb-2">
            <p>{submitError}</p>
            {showResend && (
              <button
                type="button"
                onClick={resendVerification}
                className="text-blue-600 underline text-sm mt-1"
              >
                Resend verification email
              </button>
            )}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <p className="text-red-500 font-semibold text-sm -mt-3">{errors.email}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-10"
          />
          <Button
            type="button"
            onClick={togglePasswordVisibility}
            content={showPassword ? "Hide" : "Show"}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600 hover:text-gray-900 bg-transparent rounded-r-md"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 font-semibold text-sm -mt-3">{errors.password}</p>
        )}

        <Button
          content={isLoading ? "Logging in..." : "Login"}
          type="submit"
          isLoading={isLoading}
          className="bg-[#006d77] hover:bg-[#395c5f] text-white font-semibold mt-2"
        />
      </form>

      <p className="mt-4 text-gray-600">
        Don't have an account?{" "}
        <span
          className="text-[#006d77] cursor-pointer hover:underline"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </span>
      </p>
    </AuthLayout>
  );
}

export default LoginPage;
