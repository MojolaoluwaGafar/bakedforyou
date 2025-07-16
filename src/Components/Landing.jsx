import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function Landing() {
    const navigate = useNavigate();

    const handleContinueClick = () => {
      navigate("/auth"); 
    };

  return (
    <div className="landing px-3">
      <h1>Welcome to BakedForYou Bakery</h1>
      <p>
        Discover our delicious range of baked goods, made with love and the
        finest ingredients.
      </p>
      <p>
        From artisanal breads to decadent pastries, we have something for
        everyone.
      </p>
      <p>Visit us today and treat yourself to a taste of heaven!</p>
      <Button
        content="Continue"
        className={`button bg-[#006d77] hover:bg-[#006d77] text-white font-semibold`}
        onClick={handleContinueClick}
      ></Button>
    </div>
  );
}