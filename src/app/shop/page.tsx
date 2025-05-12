'use client'

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Menu,
  X,
  ShoppingCart,
  Zap,
  Watch,
  Compass,
  Headphones,
  BookOpen,
  Monitor
} from 'lucide-react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

// Define interfaces for type safety
interface SafetyProduct {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface CartItem extends SafetyProduct {
  quantity: number;
}const safetyProducts: SafetyProduct[] = [
  {
    id: 1,
    name: "ShieldHer Taser Gun",
    category: "Personal Defense",
    description: "Non-lethal taser designed for women's safety and quick protection.",
    price: 5000,
    features: [
      "Fingerprint lock",
      "High-voltage shock",
      "Compact, purse-friendly",
      "SOS alert sync"
    ],
    icon: Zap
  },
  {
    id: 2,
    name: "Urban Escape",
    category: "Self-Defense Program",
    description: "Learn real-world street defense and escape tactics.",
    price: 2000,
    features: [
      "Quick grab escape moves",
      "Risk awareness tips",
      "Female instructors",
      "Safety checklist"
    ],
    icon: BookOpen
  },
  {
    id: 3,
    name: "Mind & Muscle",
    category: "Self-Defense Program",
    description: "Build both self-defense skills and mental strength.",
    price: 2000,
    features: [
      "Assertive body language",
      "Fear control techniques",
      "Physical drills",
      "Coaching forum"
    ],
    icon: Watch
  },
  {
    id: 4,
    name: "Click-to-Fight",
    category: "Online Program",
    description: "Train in self-defense anytime with this online course.",
    price: 1000,
    features: [
      "Video tutorials",
      "Interactive simulations",
      "Mobile-friendly",
      "Certificate included"
    ],
    icon: Monitor
  }
];

const ModernSafetyWebsite = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('home');

  const addToCart = (product: SafetyProduct) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item =>
        item.id === product.id
          ? {...item, quantity: item.quantity + 1}
          : item
      ));
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'products', 'features', 'about'];
      const scrollPosition = window.scrollY;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-green-100 text-gray-800 min-h-screen">
      <Header />
      
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-fuchsia-500 absolute top-full left-0 right-0">
          {['Home', 'Products', 'Features', 'About'].map((item) => (
            <a
              key={item.toLowerCase()}
              href={`#Rs. {item.toLowerCase()}`}
              className="block px-4 py-3 text-center hover:bg-fuchsia-600 transition text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center px-4 pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-60"></div>
        <div className="relative z-10 max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
          Designed for Her Safety <span className="text-fuchsia-600">Powered by Purpose
          </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-10">
          Empowering women with smart, stylish tools to stay safe, confident, and in control—anytime, anywhere.

          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#products"
              className="bg-fuchsia-500 text-white px-8 py-3 rounded-full hover:bg-fuchsia-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Products
            </a>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <section
        id="products"
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4 text-gray-800">
          Our Next-Gen Safety Solutions

          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Innovative self-defense products and programs made to protect, train, and uplift women on their terms.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {safetyProducts.map((product) => {
            const ProductIcon = product.icon;
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-fuchsia-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <ProductIcon className="w-12 h-12 text-fuchsia-500" />
                    <span className="text-sm text-fuchsia-700 bg-fuchsia-100 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-3 text-gray-800">
                    {product.name}
                  </h4>
                  <p className="text-gray-600 mb-4 h-20">
                    {product.description}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <ShieldCheck className="w-4 h-4 mr-2 text-fuchsia-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-800">
                      Rs.{product.price}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-fuchsia-500 text-white px-4 py-2 rounded-full hover:bg-fuchsia-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ModernSafetyWebsite;