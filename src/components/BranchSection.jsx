import { FiShoppingBag } from "react-icons/fi";

const branches = [
  { name: "Downtown Branch" },
  { name: "Uptown Branch" },
  { name: "Midtown Branch" },
  { name: "Westside Branch" },
  { name: "Eastside Branch" },
];

export default function BranchSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <h2 className="mb-6 text-3xl font-bold text-orange-600">
            Our Branches Worldwide
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:grid-cols-5">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white shadow-md p-6 transition-transform hover:scale-105 hover:shadow-lg"
            >
              <FiShoppingBag className="mb-4 h-10 w-10 text-orange-400" />
              <span className="text-center text-lg font-medium text-gray-800">
                {branch.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
