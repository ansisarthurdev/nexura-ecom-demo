import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react";
import { ListIcon, ShoppingCartIcon } from "@phosphor-icons/react/dist/ssr";
import { useSelector } from "react-redux";
import { selectCartCount } from "../redux/slices/cartSlice";

const Header = () => {
  const menu = [
    { name: "Latest Products", path: "/" },
    { name: "Backpack", path: "/" },
    { name: "Bags", path: "/" },
    { name: "Accessories", path: "/" },
    { name: "Collection", path: "/" },
    { name: "Gifts", path: "/" },
    { name: "Service", path: "/" },
  ];

  const CartCount = useSelector(selectCartCount);

  return (
    <div className="w-screen bg-white shadow-sm sticky top-0 z-50">
      <header className="max-w-[1400px] mx-auto px-6 h-[60px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <ListIcon size={24} className="lg:hidden" />
          <Link to="/" className="text-2xl font-bold text-gray-800">
            <p className="text-2xl uppercase">nexura</p>
          </Link>
        </div>

        <nav className="h-full hidden lg:block">
          <ul className="h-full flex">
            {menu.map((item, index) => (
              <li key={index} className="h-full">
                <NavLink
                  to={item.path}
                  className="h-full flex items-center px-[8px] hover:text-gray-400 transition-all duration-300 capitalize"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="hover:text-gray-400 transition-all duration-300"
          >
            <MagnifyingGlassIcon weight="bold" size={24} />
          </Link>

          <Link
            to="/cart"
            className="hover:text-gray-400 transition-all duration-300 relative"
          >
            <ShoppingCartIcon weight="bold" size={24} />

            {CartCount > 0 && (
              <div className="absolute top-[-10px] right-[-10px] bg-green-600 p-1 rounded-full w-[20px] h-[20px] flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {CartCount < 10 ? CartCount : "9+"}
                </span>
              </div>
            )}
          </Link>

          <Link
            to="/"
            className="hover:text-gray-400 transition-all duration-300"
          >
            <UserIcon weight="bold" size={24} />
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
