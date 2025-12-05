import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiBriefcase,
  FiMessageSquare,
  FiUser,
  FiPlusCircle,
  FiBell,
} from 'react-icons/fi'
import PropTypes from 'prop-types'

export function BottomNav({ role }) {
  const location = useLocation()

  const getNavItems = () => {
    if (role === 'client') {
      return [
        {
          icon: FiHome,
          label: 'Home',
          href: '/client/dashboard',
        },
        {
          icon: FiPlusCircle,
          label: 'Post',
          href: '/client/post-job',
        },
        {
          icon: FiBell,
          label: 'Notifications',
          href: '/client/notifications',
        },
        {
          icon: FiMessageSquare,
          label: 'Messages',
          href: '/client/messages',
        },
        {
          icon: FiUser,
          label: 'Profile',
          href: '/client/profile',
        },
      ]
    }
    return [
      {
        icon: FiHome,
        label: 'Home',
        href: '/freelancer/dashboard',
      },
      {
        icon: FiBriefcase,
        label: 'Jobs',
        href: '/freelancer/browse-jobs',
      },
      {
        icon: FiBell,
        label: 'Notifications',
        href: '/freelancer/notifications',
      },
      {
        icon: FiMessageSquare,
        label: 'Messages',
        href: '/freelancer/messages',
      },
      {
        icon: FiUser,
        label: 'Profile',
        href: '/freelancer/profile',
      },
    ]
  }

  const navItems = getNavItems()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EDEDED] rounded-t-[12px] z-50">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`
                flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-[10px] transition-all
                ${isActive ? 'text-black' : 'text-gray-400'}
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-poppins text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

BottomNav.propTypes = {
  role: PropTypes.oneOf(['client', 'freelancer']).isRequired,
}
