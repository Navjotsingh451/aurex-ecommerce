import React from "react";
import API_URL from "../api";

function About() {

  return (
    <div className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative h-[45vh] flex items-center justify-center text-white">
        <img
          src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
          alt="Aurex Fashion"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="relative text-center">
          <h1 className="text-5xl font-bold mb-4">About AUREX</h1>
          <p className="text-lg text-gray-200">
            Redefining modern streetwear with style and confidence.
          </p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>

        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto mb-2">
          AUREX was founded with a vision to create clothing that blends
          comfort, performance, and modern design. Our goal is to redefine
          everyday fashion with pieces that make people feel confident and
          unique.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Our collections are carefully curated to combine
            comfort, confidence and timeless style. Every piece
            reflects our passion for design and attention to detail.
          </p>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-100 py-15">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-white p-8 rounded-xl shadow  hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              To design high-quality clothing that empowers individuality and
              confidence while maintaining comfort and durability.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow  hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-bold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              To become a globally recognized streetwear brand known for
              innovation, style, and quality craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE AUREX */}
      <div className="grid md:grid-cols-4 gap-8 text-center py-8 px-8">
        <div className="p-6 border rounded-lg hover:shadow-xl hover:-translate-y-2 transition duration-300">
          <h4 className="font-semibold mb-2">Premium Quality</h4>
          <p className="text-sm text-gray-600">
            Crafted with high-quality materials for durability and comfort.
          </p>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-xl hover:-translate-y-2 transition duration-300">
          <h4 className="font-semibold mb-2">Modern Designs</h4>
          <p className="text-sm text-gray-600">
            Trend-driven styles designed for everyday wear.
          </p>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-xl hover:-translate-y-2 transition duration-300">
          <h4 className="font-semibold mb-2">Fast Delivery</h4>
          <p className="text-sm text-gray-600">
            Reliable shipping so you receive your products quickly.
          </p>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-xl hover:-translate-y-2 transition duration-300">
          <h4 className="font-semibold mb-2">Customer First</h4>
          <p className="text-sm text-gray-600">
            We focus on delivering the best shopping experience.
          </p>
        </div>
      </div>

      {/* CALL TO ACTION */}
<section className="bg-grey-500 text-white h-[45vh] relative text-center flex flex-col items-center justify-center px-6">
        <img
          src={`${API_URL}/uploads/about-2.jpg`}
          alt=""
          className="absolute inset-0  w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="relative text-center">

        <h2 className="text-3xl font-bold mb-4">
          Explore the AUREX Collection
        </h2>

        <p className="text-gray-300 mb-6">
          Discover modern streetwear designed for style and comfort.
        </p>

        <a
          href="/"
          className="bg-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Shop Now
        </a>
        </div>
      </section>
    </div>
  );
}

export default About;
