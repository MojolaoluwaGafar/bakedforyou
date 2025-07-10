import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function AuthOption() {
  const navigate = useNavigate(); 

  const handleLoginClick = () => {
    navigate('/login');
    console.log("Login button clicked!");
  };

  const handleSignUpClick = () => {
    navigate('/signup');
    console.log("Sign Up button clicked!");
  };

  const handleGuestClick = () => {
    navigate('/dashboard');
    console.log("Continue as Guest button clicked!");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="font-semibold text-xl mt-2">
          Already have an account?{" "}
          <Button
            className="bg-[#006d77] hover:bg-[#395c5f] text-white font-semibold"
            content="Login"
            onClick={handleLoginClick}
          />
        </p>

        <p className="font-semibold text-xl mt-2 text-center">
          New to our bakery?{" "}
          <Button
            className="bg-[#006d77] hover:bg-[#395c5f] text-white font-semibold"
            content="Sign Up"
            onClick={handleSignUpClick}
          />{" "}
          to enjoy exclusive offers and updates.
        </p>
        <Button
          className="bg-[#006d77] hover:bg-[#395c5f] text-white font-semibold text-xl mt-4"
          content="Continue as Guest"
          onClick={handleGuestClick}
        />
      </div>
    </>
  );
}