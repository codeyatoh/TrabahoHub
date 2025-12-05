import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../shared/components/Navbar'
import { Footer } from '../shared/components/Footer'
import { RoundedCard } from '../shared/components/RoundedCard'
import { IconCard } from '../shared/components/IconCard'
import {
  FiBriefcase,
  FiUsers,
  FiShield,
  FiDollarSign,
  FiCode,
  FiPenTool,
  FiMonitor,
  FiSmartphone,
  FiSearch,
} from 'react-icons/fi'

export function LandingPage() {
  const features = [
    {
      icon: <FiBriefcase className="w-8 h-8 text-black" />,
      title: 'Post a Job',
      description:
        'Create a detailed job posting and start receiving bids from qualified freelancers within minutes.',
    },
    {
      icon: <FiUsers className="w-8 h-8 text-black" />,
      title: 'Hire Freelancers',
      description:
        'Browse profiles, view portfolios, and hire the best Filipino talent for your project.',
    },
    {
      icon: <FiShield className="w-8 h-8 text-black" />,
      title: 'Secure Payments',
      description:
        'Our escrow system ensures your funds are safe. Release payment only when you are satisfied with the work.',
    },
    {
      icon: <FiDollarSign className="w-8 h-8 text-black" />,
      title: 'Low Fees',
      description:
        'Enjoy competitive service fees for both clients and freelancers. Keep more of what you earn.',
    },
  ]

  const categories = [
    {
      icon: <FiCode className="w-6 h-6" />,
      name: 'Web Development',
      count: '1.2k+ jobs',
    },
    {
      icon: <FiPenTool className="w-6 h-6" />,
      name: 'Graphics & Design',
      count: '800+ jobs',
    },
    {
      icon: <FiMonitor className="w-6 h-6" />,
      name: 'Digital Marketing',
      count: '500+ jobs',
    },
    {
      icon: <FiSmartphone className="w-6 h-6" />,
      name: 'Mobile Apps',
      count: '400+ jobs',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8]">
      <Navbar variant="landing" />

      {/* Hero Section */}
      <section className="bg-white rounded-b-[40px] px-4 py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="font-caveat text-5xl lg:text-7xl font-bold text-black mb-6 animate-fadeIn">
            Find the perfect
            <br />
            <span className="text-gray-600">Filipino Talent</span>
          </h1>
          <p className="font-poppins text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto animate-slideUp">
            Connect with top-tier freelancers for your projects. Safe, secure, and made for Filipinos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slideUp delay-100">
            <Link
              to="/role-select"
              className="w-full sm:w-auto px-8 py-4 bg-black text-white font-poppins font-medium rounded-[12px] hover:bg-gray-800 transition-all hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              to="/jobs"
              className="w-full sm:w-auto px-8 py-4 bg-white border border-[#EDEDED] text-black font-poppins font-medium rounded-[12px] hover:bg-[#F8F8F8] transition-all hover:scale-105"
            >
              Browse Jobs
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-100 rounded-full blur-2xl opacity-50 animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 animate-float delay-500" />
      </section>

      {/* Popular Categories */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-caveat text-4xl font-bold text-black mb-4">
              Popular Categories
            </h2>
            <p className="font-poppins text-gray-600">
              Browse jobs by skill and expertise
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <RoundedCard
                key={index}
                hover
                className="p-6 flex items-center space-x-4 cursor-pointer"
              >
                <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-black">
                    {category.name}
                  </h3>
                  <p className="font-poppins text-xs text-gray-500">
                    {category.count}
                  </p>
                </div>
              </RoundedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 px-4 rounded-[40px] my-8 mx-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-4xl font-bold text-black mb-4">
              Why TrabahoHub?
            </h2>
            <p className="font-poppins text-gray-600 max-w-2xl mx-auto">
              We provide the best platform for Filipino freelancers and clients
              to connect and collaborate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <IconCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto bg-black rounded-[24px] p-12 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-caveat text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="font-poppins text-gray-300 mb-8 max-w-xl mx-auto">
              Join thousands of Filipino freelancers and clients building their
              dreams together on TrabahoHub.
            </p>
            <Link
              to="/role-select"
              className="inline-block px-8 py-4 bg-white text-black font-poppins font-medium rounded-[12px] hover:bg-gray-100 transition-colors"
            >
              Create an Account
            </Link>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
             <div className="absolute -top-24 -left-24 w-64 h-64 border-4 border-white rounded-full" />
             <div className="absolute -bottom-24 -right-24 w-64 h-64 border-4 border-white rounded-full" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
