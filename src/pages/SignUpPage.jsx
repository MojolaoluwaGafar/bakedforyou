import React, { useState } from "react";
import AuthLayout from "../Layouts/AuthLayout";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [errors, setErrors] = useState({});
 
  const [submitError, setSubmitError] = useState("");

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validateForm = ()=>{
    const newErrors = {};
    const { fullName, email, password, confirmPassword } = formData;

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors); 
    return Object.keys(newErrors).length === 0;
  };


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };


  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError("");
    if (!validateForm()) {
      return;
    }

    setIsLoading(true); 

    try {
      const res = await fetch(
        "http://localhost:5000/api/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Signup successful:", data);
        navigate("/login"); 
      } else {
        console.error("Signup failed:", data);
        setSubmitError(data.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Network or unexpected error:", err);
      setSubmitError(
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create Your Account">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-[transparent]"
      >
        {submitError && (
          <p className="text-red-600 font-semibold mb-3">{submitError}</p>
        )}
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.fullName && (
          <p className="text-red-500 font-semibold text-sm -mt-3">
            {errors.fullName}
          </p>
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
          <p className="text-red-500 font-semibold text-sm -mt-3">
            {errors.email}
          </p>
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
          <p className="text-red-500 font-semibold text-sm -mt-3">
            {errors.password}
          </p>
        )}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword" 
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-10"
          />
          <Button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            content={showConfirmPassword ? "Hide" : "Show"}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600 hover:text-gray-900 bg-transparent rounded-r-md"
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 font-semibold text-sm -mt-3">
            {errors.confirmPassword}
          </p>
        )}
        <Button
          content={isLoading ? "Signing Up..." : "Sign Up"}
          type="submit"
          isLoading={isLoading} 
          className="bg-[#006d77] hover:bg-[#395c5f] text-white font-semibold mt-2"
        />
      </form>

      <p className="mt-4 text-gray-600">
        Already have an account?{" "}
        <span
          className="text-[#006d77] cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </AuthLayout>
  );
}

export default SignupPage;
