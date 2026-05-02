import { Link } from "react-router-dom";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authcontext";
import AccountMenu from "./accountmenu";
import About from "../pages/about";

function Navbar() {
  const { cartItems } = useCart();
  const { userInfo } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between ">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-[4px] hover:text-red-600 transition-colors "
        >
          AUREX
          <span className="text-xs text-red-600 tracking-wider hover:text-white ">
            Premium Fashion
          </span>
        </Link>

        {/* MENU */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {[
            { name: "Home", path: "/" },
            { name: "Men", path: "/shop?category=men" },
            { name: "Women", path: "/shop?category=women" },
            { name: "Kids", path: "/shop?category=kids" },
            // { name: "Offers", path: "/offers" },
            { name: "About", path: "/about" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="relative group hover:text-red-600 transition-colors"
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {/* Admin Link - Only show if user is admin */}
          {userInfo?.isAdmin && (
            <Link
              to="/admindashboard"
              className="relative group hover:text-red-600 transition-colors"
            >
              Admin
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full"></span>
            </Link>
          )}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6  text-sm font-medium font-popins,serif">
          <AccountMenu />

          <Link
            to="/cart"
            className="relative hover:text-red-600 transition-colors "
          >
            Cart ({cartItems?.length || 0})
            {cartItems?.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-2 py-px rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
          {/* Checkout Button */}
          {cartItems?.length > 0 && (
            <Link
              to="/checkout"
              className="bg-red-600 px-4 py-2 rounded-md text-white hover:bg-red-700 transition"
            >
              Checkout
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
