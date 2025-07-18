import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    axios.get(`http://localhost:5050/api/auth/verify-email?token=${token}&email=${email}`)
      .then(res => setMessage(res.data.message))
      .catch(err => setMessage(err.response?.data?.message || 'Something went wrong'));
  }, []);

  return <div className="p-10 text-center">{message}</div>;
};

export default VerifyEmail;
