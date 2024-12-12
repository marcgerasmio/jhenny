import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { FaShoppingCart } from "react-icons/fa";

function Products() {
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const selectedBranch = sessionStorage.getItem("selectedBranch");
  const userDetails = JSON.parse(sessionStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/products?filters[branch_name][$eq]=${selectedBranch}`
        );
        const data = await response.json();
        setFilteredProducts(data.data || []); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [selectedBranch]);

  const handleQuantityChange = (value) => {
    if (!isNaN(value) && value > 0) setQuantity(value);
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setQuantity(1); 
    setIsModalOpen(true);
  };

  const handleCheckout = async (product) => {
    console.log(product)
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const cartData = {
      data: {
        product_name: product.product_name,
        quantity: quantity,
        total: product.product_price * quantity,
        customer_name: userDetails.name,
        date: formattedDate,
        branch_name : product.branch_name,
      }
    };


    const jsonString = JSON.stringify(cartData);

    try {
      const response = await fetch("http://localhost:1337/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Product bought successfully!");
      window.location.reload();
      } else {
        const errorData = await response.text(); 
        alert("Failed to buy product!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding to cart!");
    }
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
    setOrderSuccess(false);
  };

  const handlePlaceOrder = () => {
    setOrderSuccess(true);
  };

  const applyPriceFilter = () => {
    const filtered = filteredProducts.filter((product) => {
      const productPrice = product.product_price;
      const isMinValid =
        minPrice === "" || productPrice >= parseFloat(minPrice);
      const isMaxValid =
        maxPrice === "" || productPrice <= parseFloat(maxPrice);
      return isMinValid && isMaxValid;
    });
    setFilteredProducts(filtered);
  };

  const totalPrice = selectedProduct ? quantity * selectedProduct.price : 0;
  const shippingCost = 5.0;
  const totalAmount = totalPrice + shippingCost;

  const handleCart = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    console.log(userDetails.name)
  };

  const handleAddToCart = async () => {
    const cartData = {
      data: {
        product_name: selectedProduct.product_name,
        quantity: quantity,
        price: selectedProduct.product_price,
        user_name: userDetails.name, 
        branch_name : selectedProduct.branch_name,
      }
    };

    const jsonString = JSON.stringify(cartData);

    try {
      const response = await fetch("http://localhost:1337/api/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: jsonString,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Product added to cart!");
        console.log(data);
        window.location.reload();
      } else {
        const errorData = await response.text(); 
        alert("Failed to add to cart!");
        console.error(errorData);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding to cart!");
    }
  };

  return (
    <>
      <Header />
      <div className="my-4 mt-8 mx-8 flex flex-col gap-4 justify-between">
        <div className="flex gap-4 justify-between">
          <div>
          <h1 className="text-bold text-xl mt-2">
          {selectedBranch} Branch
          </h1>
          </div>
          <div className="flex gap-4 justify-end">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-3 w-1/5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            min="0"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-3 w-1/5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            min="0"
          />
          <button
            onClick={applyPriceFilter}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Apply Filter
          </button>
          </div>
       
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-5 py-3 mb-10">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md"
          >
            <img
              src={product.image || "https://via.placeholder.com/300x200"}
              alt={product.name}
              className="h-48 w-full object-cover"
            />
            <div className="flex flex-1 flex-col p-4">
              <h3 className="text-lg font-medium overflow-hidden text-ellipsis">
                {product.product_name}
              </h3>
              <span className="text-xl font-bold mb-8">
                ${product.product_price}
              </span>
              <div className="flex flex-col mt-auto gap-2">
                <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                onClick={() => handleCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleCheckout(product)}
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
                  {selectedProduct?.product_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Price:</span>
                <span className="text-gray-800 font-semibold">
                  ${selectedProduct?.product_price}
                </span>
              </div>
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
                      handleQuantityChange(parseInt(e.target.value, 10))
                    }
                    className="border border-gray-300 rounded-md w-16 text-center py-2"
                    min="1"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300 transition"
                  >
                    +
                  </button>
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
                  onClick={handleAddToCart}
                  className="w-full py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 transition"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  ${selectedProduct?.price}
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
      <Footer />
    </>
  );
}

export default Products;
