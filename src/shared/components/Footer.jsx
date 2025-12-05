import React from 'react'
import { Link } from 'react-router-dom'

export function Footer() {
  const links = [
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Terms',
      href: '/terms',
    },
    {
      label: 'Privacy',
      href: '/privacy',
    },
    {
      label: 'Careers',
      href: '/careers',
    },
  ]
  return (
    <footer className="bg-[#F8F8F8] rounded-t-[12px] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <Link to="/" className="font-caveat text-2xl font-bold text-black">
            ᜆ᜔ᜇᜊᜑᜓᜑᜓᜊ᜔
          </Link>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-poppins text-sm text-gray-600 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Tagline */}
          <p className="font-poppins text-sm text-gray-500">
            Made for Filipino Clients & Freelancers 🇵🇭
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-[#EDEDED] text-center">
          <p className="font-poppins text-xs text-gray-400">
            © {new Date().getFullYear()} ᜆ᜔ᜇᜊᜑᜓᜑᜓᜊ᜔. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
