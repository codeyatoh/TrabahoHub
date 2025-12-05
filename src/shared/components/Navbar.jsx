import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiUser, FiBell, FiSearch } from 'react-icons/fi'
import PropTypes from 'prop-types'

export function Navbar({ variant = 'landing', userRole }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  
  const landingLinks = [
    {
      label: 'Browse Jobs',
      href: '/login', // Adjust if needed
    },
    {
      label: 'Become a Freelancer',
      href: '/login', // Adjust if needed
    },
  ]

  const getDashboardLinks = () => {
    switch (userRole) {
      case 'client':
        return [
          {
            label: 'Dashboard',
            href: '/client/dashboard',
          },
          {
            label: 'Post Job',
            href: '/client/post-job',
          },
          {
            label: 'Projects',
            href: '/client/projects',
          },
          {
            label: 'Messages',
            href: '/client/messages',
          },
        ]
      case 'freelancer':
        return [
          {
            label: 'Dashboard',
            href: '/freelancer/dashboard',
          },
          {
            label: 'Browse Jobs',
            href: '/freelancer/browse-jobs',
          },
          {
            label: 'Profile',
            href: '/freelancer/profile',
          },
          {
            label: 'Messages',
            href: '/client/messages',
          },
        ]
      case 'admin':
        return [
          {
            label: 'Dashboard',
            href: '/admin/dashboard',
          },
          {
            label: 'Users',
            href: '/admin/users',
          },
          {
            label: 'Jobs',
            href: '/admin/jobs',
          },
          {
            label: 'Reports',
            href: '/admin/reports',
          },
        ]
      default:
        return []
    }
  }

  const links = variant === 'landing' ? landingLinks : getDashboardLinks()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#EDEDED] rounded-b-[12px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-caveat text-2xl font-bold text-black">
            ᜆ᜔ᜇᜊᜑᜓᜑᜓᜊ᜔
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`font-poppins text-sm transition-colors ${location.pathname === link.href ? 'text-black font-medium' : 'text-gray-600 hover:text-black'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {variant === 'dashboard' && (
              <>
                <button className="p-2 text-gray-600 hover:text-black transition-colors">
                  <FiSearch className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-black transition-colors relative">
                  <FiBell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-black rounded-full"></span>
                </button>
                <Link
                  to={
                    userRole === 'admin'
                      ? '/admin/dashboard'
                      : `/${userRole}/profile`
                  }
                  className="p-2 text-gray-600 hover:text-black transition-colors"
                >
                  <FiUser className="w-5 h-5" />
                </Link>
              </>
            )}
            {variant === 'landing' && (
              <Link
                to="/login"
                className="font-poppins text-sm px-5 py-2 bg-black text-white rounded-[10px] hover:bg-gray-800 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#EDEDED]">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block py-3 font-poppins text-sm text-gray-600 hover:text-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {variant === 'landing' && (
              <Link
                to="/login"
                className="block mt-4 text-center font-poppins text-sm px-5 py-2 bg-black text-white rounded-[10px]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  variant: PropTypes.oneOf(['landing', 'dashboard']),
  userRole: PropTypes.oneOf(['client', 'freelancer', 'admin']),
}
