export default function ProductCard() {
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
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {popularProducts.map((product, index) => (
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
            <h3 className="mb-2 text-lg font-medium h-12 overflow-hidden text-ellipsis">
              {product.name}
            </h3>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              <button className="flex items-center gap-2 rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13l-1.5 7h13m-14.5-7h-2m6 0a1 1 0 100 2 1 1 0 000-2zm10 0a1 1 0 100 2 1 1 0 000-2z"
                  />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
