"use client";

import { Brain, Zap, Shield, Cpu, Eye, MessageSquare, BarChart3, Sparkles } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: "Advanced Machine Learning",
      description: "State-of-the-art ML algorithms that learn and adapt to your business needs in real-time.",
      gradient: "from-purple-500 to-pink-500",
      delay: "0"
    },
    {
      icon: Zap,
      title: "Lightning Fast Processing",
      description: "Process millions of data points in milliseconds with our optimized AI infrastructure.",
      gradient: "from-cyan-500 to-blue-500",
      delay: "200"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance with global standards.",
      gradient: "from-green-500 to-teal-500",
      delay: "400"
    },
    {
      icon: Cpu,
      title: "Neural Network Architecture",
      description: "Custom neural networks designed for maximum efficiency and accuracy in your domain.",
      gradient: "from-orange-500 to-red-500",
      delay: "600"
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Advanced image and video analysis capabilities for visual intelligence applications.",
      gradient: "from-indigo-500 to-purple-500",
      delay: "800"
    },
    {
      icon: MessageSquare,
      title: "Natural Language Processing",
      description: "Understand and generate human language with context-aware AI communication.",
      gradient: "from-pink-500 to-rose-500",
      delay: "1000"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Forecast trends and make data-driven decisions with advanced predictive models.",
      gradient: "from-yellow-500 to-orange-500",
      delay: "1200"
    },
    {
      icon: Sparkles,
      title: "AI Automation",
      description: "Automate complex workflows and processes with intelligent decision-making capabilities.",
      gradient: "from-teal-500 to-cyan-500",
      delay: "1400"
    }
  ];

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-black to-gray-900">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full mix-blend-screen filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover the cutting-edge capabilities that make Digitalaiindia.com the future of artificial intelligence
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative"
                style={{
                  animationDelay: `${feature.delay}ms`
                }}
              >
                {/* Card */}
                <div className="relative h-full p-8 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-500 group-hover:transform group-hover:scale-105">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl"
                       style={{
                         background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                         backgroundImage: `linear-gradient(135deg, rgb(6 182 212), rgb(168 85 247))`
                       }}></div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className="absolute bottom-4 right-4 w-2 h-2 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-gray-400 mb-6">Ready to experience the future of AI?</p>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300">
            <span className="relative z-10">Explore All Features</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
          </button>
        </div>
      </div>
    </section>
  );
}
