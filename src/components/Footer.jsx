import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-semibold">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Customers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Our Team
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Grocery
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Delivery
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Wholesale
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Partner with us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-2">
              <li>123 street 45, Food City</li>
              <li>contact@mrdiy.com</li>
              <li>+1 (123) 456-7890</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-200">
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-200">
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-green-200">
                <FiInstagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-orange-500 pt-8 text-center">
          <p>&copy; 2024 Mr. DIY. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
