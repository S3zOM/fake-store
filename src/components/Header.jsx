import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStore } from "react-icons/fa";

const Header = function Header() {
  return (
    <header>
      <nav className="bg-white border-b border-blue-200">
        <div className="max-w-7xl mx-auto flex items-center py-3 px-4">
          <a
            className="flex items-center gap-2 text-2xl font-bold text-blue-700 tracking-wide mr-auto no-underline"
            href="/">
            <FaStore className="mb-1 text-[1.6em] text-blue-500" />
            <span>Fake Store</span>
          </a>
          <ul className="flex flex-row items-center mx-auto space-x-6">
            <li className="flex items-center">
              <a
                className="text-blue-700 hover:text-blue-500 transition-colors no-underline items-center"
                href="/products">
                Products
              </a>
            </li>
            <li className="flex items-center">
              <a
                className="text-blue-700 hover:text-blue-500 transition-colors no-underline items-center"
                href="/favorites">
                Favorites
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
