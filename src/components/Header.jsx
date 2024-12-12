import { FiShoppingCart } from "react-icons/fi";
import PurchaseHistory from "./PurchaseHistory";
import CartModal from "./CartModal";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTransactionHistoryOpen, setIsTransactionHistoryOpen] =
    useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
        <div className="container mx-auto flex h-21 items-center justify-between px-4 p-2">
          <div className="flex items-center space-x-4">
            <img src="icon.png" alt="Grocery Store" />
          </div>
          <div className="flex items-center space-x-4">
            <button
              className="relative text-gray-700 hover:text-orange-600"
              onClick={() => setIsCartOpen(true)}
            >
              <FiShoppingCart className="h-6 w-6" />
            </button>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isTransactionHistoryOpen}
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li onClick={() => setIsTransactionHistoryOpen(true)}>
                  <button className="text-left w-full">
                    Transaction History
                  </button>
                </li>
                <Link to="/">
                  <li>
                    <button className="text-left w-full">Logout</button>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </header>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <PurchaseHistory
        isOpen={isTransactionHistoryOpen}
        onClose={() => setIsTransactionHistoryOpen(false)}
      />
    </>
  );
}
