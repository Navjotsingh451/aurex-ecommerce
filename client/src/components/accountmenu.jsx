import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/authcontext";
import { Link } from "react-router-dom";

function AccountMenu() {
  const { userInfo, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // close when clicking outside
  // useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    // };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
    }
    // , []);

  return (
    <div className="relative" ref={menuRef}>
      
      {/* Account Button */}
      <button
        onClick={() => setOpen(!open)}
        className="hover:text-red-500 font-semibold"
      >
        Account
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-52 bg-white text-black rounded-lg shadow-lg p-4 z-50">

          {userInfo ? (
            <>
              <p className="font-semibold mb-3">
                Hello, {userInfo.name}
              </p>

              <Link
                to="/orders"
                className="block py-1 hover:text-red-500"
              >
                My Orders
              </Link>

              <button
                onClick={logout}
                className="block w-full text-left cursor-pointer py-1 text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block py-1 hover:text-red-500"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block py-1 hover:text-red-500"
              >
                Register
              </Link>
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default AccountMenu;