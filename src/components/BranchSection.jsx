import { useState, useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function BranchSection() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/branches");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data.data);
        setBranches(data.data); // Assuming data.data contains the array of branches
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleBranchClick = (branchName) => {
    sessionStorage.setItem("selectedBranch", branchName);
    navigate("/products");
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <h2 className="mb-6 text-3xl font-bold text-orange-600">
            Our Branches Worldwide
          </h2>
        </div>
        {loading ? (
          <p className="text-center text-gray-500">Loading branches...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-5">
            {branches.map((branch) => (
              <div
                key={branch.name}
                className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={() => handleBranchClick(branch.branch_name)}
              >
                <FiShoppingBag className="mb-4 h-10 w-10 text-orange-400" />
                <span className="text-center text-lg font-medium text-gray-800">
                  {branch.branch_name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
