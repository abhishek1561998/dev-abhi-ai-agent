"use client";

import { Building2, ShoppingCart, Heart, GraduationCap, Car, Factory, Smartphone, TrendingUp } from "lucide-react";

export default function SolutionsSection() {
  const solutions = [
    {
      icon: Building2,
      title: "Enterprise AI",
      description: "Transform your business operations with intelligent automation and decision-making systems.",
      features: ["Process Automation", "Predictive Analytics", "Smart Workflows"],
      gradient: "from-blue-600 to-purple-600",
      image: "🏢"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Intelligence",
      description: "Boost sales with personalized recommendations, inventory optimization, and customer insights.",
      features: ["Recommendation Engine", "Price Optimization", "Customer Analytics"],
      gradient: "from-green-600 to-teal-600",
      image: "🛒"
    },
    {
      icon: Heart,
      title: "Healthcare AI",
      description: "Revolutionize patient care with diagnostic assistance, treatment planning, and health monitoring.",
      features: ["Medical Imaging", "Drug Discovery", "Patient Monitoring"],
      gradient: "from-red-600 to-pink-600",
      image: "🏥"
    },
    {
      icon: GraduationCap,
      title: "Education Technology",
      description: "Personalize learning experiences with adaptive content and intelligent tutoring systems.",
      features: ["Adaptive Learning", "Performance Analytics", "Content Generation"],
      gradient: "from-indigo-600 to-blue-600",
      image: "🎓"
    },
    {
      icon: Car,
      title: "Automotive AI",
      description: "Drive innovation with autonomous systems, predictive maintenance, and smart transportation.",
      features: ["Autonomous Driving", "Predictive Maintenance", "Traffic Optimization"],
      gradient: "from-orange-600 to-red-600",
      image: "🚗"
    },
    {
      icon: Factory,
      title: "Manufacturing 4.0",
      description: "Optimize production with smart factories, quality control, and supply chain intelligence.",
      features: ["Quality Control", "Predictive Maintenance", "Supply Chain"],
      gradient: "from-gray-600 to-slate-600",
      image: "🏭"
    }
  ];

  return (
    <section id="solutions" className="relative py-24 bg-gradient-to-b from-gray-900 to-black">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
      
      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl mb-6">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Solutions for
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Every Industry
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Tailored artificial intelligence solutions that drive innovation and growth across diverse sectors
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden"
              >
                {/* Card */}
                <div className="relative h-full p-8 bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-800 hover:border-purple-500/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  {/* Background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${solution.gradient} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-4xl">{solution.image}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                      {solution.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {solution.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="relative z-10 space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${solution.gradient} rounded-full`}></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="relative z-10 mt-8">
                    <button className={`w-full py-3 bg-gradient-to-r ${solution.gradient} text-white font-semibold rounded-xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300`}>
                      Learn More
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="mt-20 text-center">
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-3xl border border-purple-500/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Don't see your industry?
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Our AI solutions are highly customizable and can be adapted to any industry or use case. 
              Let's discuss how we can create a tailored solution for your specific needs.
            </p>
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Contact Our Experts</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
