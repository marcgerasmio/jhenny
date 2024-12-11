import {
  FiCoffee,
  FiShoppingBag,
  FiBriefcase,
  FiPackage,
  FiFeather,
} from "react-icons/fi";
import { TfiApple } from "react-icons/tfi";
import { IoShirt } from "react-icons/io5";

const categories = [
  { name: "Fruits", icon: TfiApple },
  { name: "Vegetables", icon: FiCoffee },
  { name: "Milk-Juice", icon: FiShoppingBag },
  { name: "Bakery", icon: FiBriefcase },
  { name: "Personal-Care", icon: IoShirt },
  { name: "Grains", icon: FiPackage },
  { name: "Chicken & Egg", icon: FiFeather },
];

export default function CategorySection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl font-bold text-green-600">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-7">
          {categories.map((category) => (
            <div
              key={category.name}
              className="flex flex-col items-center justify-center rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-300"
            >
              <category.icon className="mb-2 h-8 w-8 text-green-600" />
              <span className="text-center text-sm font-medium">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
