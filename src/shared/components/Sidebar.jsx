import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FiHome,
  FiBriefcase,
  FiMessageSquare,
  FiUser,
  FiUsers,
  FiFileText,
  FiPlusCircle,
  FiFolder,
  FiBell,
  FiSettings,
  FiLogOut,
  FiAlertCircle,
  FiCheckCircle,
  FiDollarSign,
} from 'react-icons/fi'
import PropTypes from 'prop-types'

export function Sidebar({ role }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
    navigate('/login')
  }

  const getNavItems = () => {
    switch (role) {
      case 'client':
        return [
          {
            icon: FiHome,
            label: 'Dashboard',
            href: '/client/dashboard',
          },
          {
            icon: FiBriefcase,
            label: 'Your Jobs',
            href: '/client/jobs',
          },
          {
            icon: FiFolder,
            label: 'Projects',
            href: '/client/projects',
          },
          {
            icon: FiMessageSquare,
            label: 'Messages',
            href: '/client/messages',
          },
          {
            icon: FiBell,
            label: 'Notifications',
            href: '/client/notifications',
          },
          {
            icon: FiUser,
            label: 'Profile',
            href: '/client/profile',
          },
          {
            icon: FiSettings,
            label: 'Settings',
            href: '/client/settings',
          },
        ]
      case 'freelancer':
        return [
          {
            icon: FiHome,
            label: 'Dashboard',
            href: '/freelancer/dashboard',
          },
          {
            icon: FiCheckCircle,
            label: 'My Jobs',
            href: '/freelancer/my-jobs',
          },
          {
            icon: FiDollarSign,
            label: 'Earnings',
            href: '/freelancer/earnings',
          },
          {
            icon: FiBriefcase,
            label: 'Browse Jobs',
            href: '/freelancer/browse-jobs',
          },
          {
            icon: FiMessageSquare,
            label: 'Messages',
            href: '/freelancer/messages',
          },
          {
            icon: FiBell,
            label: 'Notifications',
            href: '/freelancer/notifications',
          },
          {
            icon: FiUser,
            label: 'Profile',
            href: '/freelancer/profile',
          },
          {
            icon: FiSettings,
            label: 'Settings',
            href: '/freelancer/settings',
          },
        ]
      case 'admin':
        return [
          {
            icon: FiHome,
            label: 'Dashboard',
            href: '/admin/dashboard',
          },
          {
            icon: FiUsers,
            label: 'Manage Users',
            href: '/admin/users',
          },
          {
            icon: FiBriefcase,
            label: 'Manage Jobs',
            href: '/admin/jobs',
          },
          {
            icon: FiAlertCircle,
            label: 'Reports',
            href: '/admin/reports',
          },
          {
            icon: FiSettings,
            label: 'Settings',
            href: '/admin/settings',
          },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-[#EDEDED] h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#EDEDED] flex-shrink-0">
        <Link to="/" className="font-caveat text-2xl font-bold text-black">
          ᜆ᜔ᜇᜊᜑᜓᜑᜓᜊ᜔
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-[10px] transition-all
                    ${isActive ? 'bg-black text-white' : 'text-gray-600 hover:bg-[#F8F8F8] hover:text-black'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-poppins text-sm">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-[#EDEDED]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-[10px] text-red-600 hover:bg-red-50 transition-all"
        >
          <FiLogOut className="w-5 h-5" />
          <span className="font-poppins text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}

Sidebar.propTypes = {
  role: PropTypes.oneOf(['client', 'freelancer', 'admin']).isRequired,
}
