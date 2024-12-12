import React, { useState } from "react";
import Header from "./Header";
import BranchSection from "./BranchSection";
import Footer from "./Footer";

const bannerItems = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200",
    alt: "Fresh Vegetables",
    title: "Fresh Vegetables",
    description: "Get farm-fresh vegetables delivered to your doorstep",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200",
    alt: "Organic Fruits",
    title: "Organic Fruits",
    description: "Enjoy the sweetness of nature with our organic fruits",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200",
    alt: "Daily Essentials",
    title: "Daily Essentials",
    description: "Stock up on your daily essentials with great discounts",
  },
];

export default function Dashboard() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? bannerItems.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="px-5">
        <div className="container mx-auto px-4 py-7">
          <div className="carousel w-full">
            {bannerItems.map((item, index) => (
              <div
                key={item.id}
                className={`carousel-item relative w-full ${
                  index === currentSlide ? "block" : "hidden"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-[200px] w-full object-cover rounded-lg md:h-[300px]"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 p-4 text-center text-white">
                  <h2 className="mb-2 text-2xl font-bold md:text-3xl">
                    {item.title}
                  </h2>
                  <p className="text-sm md:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center py-4">
            <button className="btn btn-circle" onClick={prevSlide}>
              ❮
            </button>
            <button className="btn btn-circle" onClick={nextSlide}>
              ❯
            </button>
          </div>
        </div>
        <hr />
        <BranchSection />
        <section className="bg-orange-400 text-white py-10 mb-10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Download Our App and Shop on the Go!
            </h2>
            <p className="mb-6 text-lg">
              Enjoy the best shopping experience directly from your mobile.
              Download our app today and shop fresh produce and daily essentials
              with ease!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Play_Store_logo_2015.png"
                  alt="Google Play Store"
                  className="w-32 h-auto"
                />
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/1f/App_Store_%28iOS%29_logo.svg"
                  alt="App Store"
                  className="w-32 h-auto"
                />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
