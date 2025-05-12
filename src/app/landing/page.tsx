'use client'
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Shield, AlertTriangle, Heart, CheckCircle } from 'lucide-react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
const SafetyLandingPage = () => {
  const [subscribeEmail, setSubscribeEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSubscribeEmail(e.target.value);
  };

  const handleSubscribe = () => {
    if (subscribeEmail) {
      setIsSubscribed(true);
      setSubscribeEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 text-gray-800 font-sans">
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <header className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-5xl font-extrabold mb-4 text-fuchsia-700">
          Your Safety, Our Priority
        </h2>
        <p className="text-xl mb-8 text-gray-700 max-w-2xl mx-auto">
        At Shield-Her, we prioritize your safety through innovative tools and confidence-driven self-defense solutions.
        </p>
        <div className="flex justify-center space-x-4">
          <a 
            href="/main" 
            className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition text-2xl font-bold"
          >
            Shield-Her
          </a>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16">
        <h3 className="text-3xl font-bold text-center mb-12 text-fuchsia-800">
          Our Key Features
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: <AlertTriangle className="text-fuchsia-600 w-16 h-16 mb-4" />,
              title: "Risk Assessment",
              description: "Comprehensive risk evaluation and mitigation strategies."
            },
            { 
              icon: <Heart className="text-pink-600 w-16 h-16 mb-4" />,
              title: "Personal Protection",
              description: "Personalized safety plans tailored to your unique needs."
            },
            { 
              icon: <CheckCircle className="text-fuchsia-600 w-16 h-16 mb-4" />,
              title: "Continuous Monitoring",
              description: "24/7 advanced monitoring and rapid response systems."
            }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition"
            >
              {feature.icon}
              <h4 className="text-xl font-bold mb-4 text-fuchsia-800">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-fuchsia-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-6 text-fuchsia-800">
            Stay Informed, Stay Safe
          </h3>
          <p className="mb-8 text-gray-700 max-w-md mx-auto">
            Subscribe to our newsletter for the latest safety tips and updates.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={subscribeEmail}
                onChange={handleEmailChange}
                className="flex-grow p-3 rounded-l-lg border border-fuchsia-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              />
              <button 
                onClick={handleSubscribe}
                className="bg-fuchsia-600 text-white px-6 py-3 rounded-r-lg hover:bg-fuchsia-700 transition"
              >
                Subscribe
              </button>
            </div>
            {isSubscribed && (
              <p className="text-green-600 mt-4">
                Thank you for subscribing!
              </p>
            )}
          </div>
        </div>
      </section>

     <Footer />

    </div>
  );
};

export default SafetyLandingPage;