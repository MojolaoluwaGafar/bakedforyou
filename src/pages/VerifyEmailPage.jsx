import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const { email, token } = useParams();
  const [message, setMessage] = useState("Verifying...");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5050/api/user/verify-email/${email}/${token}`)
      .then((res) => {
        setMessage(res.data.message);
        setSuccess(true);
      })
      .catch((err) => {
        setMessage(err.response?.data?.message || "Something went wrong. Try again.");
        setSuccess(false);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen px-4 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{message}</h2>
      {success && (
        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => navigate("/login")}
        >
          Proceed to Login
        </button>
      )}
    </div>
  );
};

export default VerifyEmailPage;
