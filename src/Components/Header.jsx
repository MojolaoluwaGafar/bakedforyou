import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const links = [
    { id: "1", pathName: "Home", to: "/home" },
    { id: "2", pathName: "Bakeries", to: "/bakeries" },
    { id: "3", pathName: "Apply", to: "/apply" },
    { id: "4", pathName: "Order now", to: "/orderNow" },
    { id: "5", pathName: "About us", to: "/aboutUs" },
  ];

  return (
    <header className="bg-[#006d77] px-6 py-4 shadow-md w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <p className="text-xl font-bold mb-2 md:mb-0">
          Best Pastries shopping platform for you
        </p>
        <nav className="flex flex-wrap gap-4">
          {links.map(link => (
            <Link
              key={link.id}
              to={link.to}
              className="hover:underline text-sm font-medium"
            >
              {link.pathName}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
