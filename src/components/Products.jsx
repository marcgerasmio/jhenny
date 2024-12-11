import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { FaShoppingCart } from "react-icons/fa";

const popularProducts = [
  {
    name: "Red Carrot",
    price: 2.99,
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Cauliflower",
    price: 3.49,
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Cilantro",
    price: 1.99,
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Green Capsicum (500gm)",
    price: 4.99,
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Green Capsicum (500gm)",
    price: 4.99,
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Green Capsicum (500gm)",
    price: 4.99,
    image: "https://via.placeholder.com/300x200",
  },
  {
    name: "Green Capsicum (500gm)",
    price: 4.99,
    image: "https://via.placeholder.com/300x200",
  },
];

function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity, setQuantity] = useState(1); // Keep track of quantity
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Store selected product
  const navigate = useNavigate();

  // Calculate total price and shipping
  const totalPrice = selectedProduct ? selectedProduct.price * quantity : 0;
  const shipping = 5.0;
  const totalAmount = totalPrice + shipping;

  // Handle quantity change
  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, value)); // Prevent quantity from going below 1
  };

  // Handle modal open and order details
  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrderSuccess(false);
  };

  // Handle place order
  const handlePlaceOrder = () => {
    setOrderSuccess(true);
  };

  // Filter products based on search query
  const filteredProducts = popularProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="my-4 mx-8 flex justify-between">
        <h1 className="text-bold text-xl mt-2">
          (account sa gi tuplok nga category) (unsa ni nga brand)
        </h1>
        <input
          type="text"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-3 w-1/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 py-3 mb-10">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-lg font-medium overflow-hidden text-ellipsis">
                {product.name}
              </h3>
              <span className="text-xl font-bold mb-8">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex flex-col mt-auto gap-2">
                <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)}
                  className="flex justify-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-400"
                >
                  <FaShoppingCart className="h-5 w-5" />
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />

      {/* Modal for Order Details */}
      {isModalOpen && !orderSuccess && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-lg transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Order Details
            </h1>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-700">Product:</span>
                <span className="text-gray-800 font-semibold">
                  {selectedProduct?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Price:</span>
                <span className="text-gray-800 font-semibold">
                  ${selectedProduct?.price.toFixed(2)}
                </span>
              </div>

              {/* Quantity Input */}
              <div className="flex justify-between items-center">
                <label className="text-gray-700">Quantity:</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value))
                    }
                    className="border border-gray-300 rounded-md w-16 text-center py-2"
                    min="1"
                    max={selectedProduct?.stock}
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 mt-6">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="text-gray-800 font-semibold">
                    ${totalPrice}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Shipping:</span>
                  <span className="text-gray-800 font-semibold">$5.00</span>
                </div>
                <div className="flex justify-between font-semibold text-lg text-gray-900">
                  <span>Total:</span>
                  <span>${totalAmount}</span>
                </div>
              </div>

              <div className="flex justify-between gap-4 mt-8">
                <button
                  onClick={handleCloseModal}
                  className="w-full py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {orderSuccess && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-lg transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-2xl font-bold text-center text-green-700 mb-4">
              Order Successful!
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Thank you for your purchase!
            </p>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Order ID:</span>
                <span className="text-gray-800 font-semibold">#12345</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Product:</span>
                <span className="text-gray-800 font-semibold">
                  {selectedProduct?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Price:</span>
                <span className="text-gray-800 font-semibold">
                  ${selectedProduct?.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Quantity:</span>
                <span className="text-gray-800 font-semibold">{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal:</span>
                <span className="text-gray-800 font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Shipping:</span>
                <span className="text-gray-800 font-semibold">$5.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg text-gray-900">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={handleCloseModal}
                className="w-full py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition"
              >
                Go to Products
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
