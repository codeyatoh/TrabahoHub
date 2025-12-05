import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiUserX,
  FiCheck,
} from 'react-icons/fi'
import { Select } from '../../../shared/components/Select'
import angelitoImg from '../../../assets/images/Angelito-Halmain.jpg'
import jhonHaroldImg from '../../../assets/images/Jhon-Harold-Rueda.jpg'
import jhonChristianImg from '../../../assets/images/John-Christian-Saporno.jpg'
import aivyImg from '../../../assets/images/Aivy-Gonzales.jpg'
import jonathanImg from '../../../assets/images/Jonathan-Rolter-Dagondon.jpg'

const mockUsers = [
  {
    id: '1',
    name: 'Angelito Halmain',
    email: 'angelito@email.com',
    role: 'freelancer',
    location: 'Cebu City',
    status: 'active',
    joined: 'Jun 2022',
    image: angelitoImg,
  },
  {
    id: '2',
    name: 'Jhon Harold Rueda',
    email: 'jhonharold@email.com',
    role: 'freelancer',
    location: 'Manila',
    status: 'active',
    joined: 'Aug 2022',
    image: jhonHaroldImg,
  },
  {
    id: '3',
    name: 'Jhon Christian Saporno',
    email: 'jhonchristian@email.com',
    role: 'freelancer',
    location: 'Davao',
    status: 'active',
    joined: 'Sep 2022',
    image: jhonChristianImg,
  },
  {
    id: '4',
    name: 'Aivy Gonzales',
    email: 'aivy@email.com',
    role: 'client',
    location: 'Quezon City',
    status: 'active',
    joined: 'Jan 2023',
    image: aivyImg,
  },
  {
    id: '5',
    name: 'Jonathan Rolter Dagondon',
    email: 'jonathan@email.com',
    role: 'admin',
    location: 'Makati',
    status: 'active',
    joined: 'Mar 2023',
    image: jonathanImg,
  },
]

export function ManageUsers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [openMenu, setOpenMenu] = useState(null)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const roleOptions = [
    {
      value: 'all',
      label: 'All Roles',
    },
    {
      value: 'client',
      label: 'Clients',
    },
    {
      value: 'freelancer',
      label: 'Freelancers',
    },
  ]

  const statusOptions = [
    {
      value: 'all',
      label: 'All Status',
    },
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'suspended',
      label: 'Suspended',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="admin" />

      <main className="flex-1 lg:ml-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Manage Users
            </h1>
            <p className="font-poppins text-gray-600">
              View and manage platform users
            </p>
          </div>

          {/* Filters */}
          <RoundedCard className="p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  value={roleFilter}
                  onChange={(value) => setRoleFilter(value)}
                  options={roleOptions}
                  className="w-40"
                />
                <Select
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value)}
                  options={statusOptions}
                  className="w-40"
                />
              </div>
            </div>
          </RoundedCard>

          {/* Users Table */}
          <RoundedCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F8F8] border-b border-[#EDEDED]">
                  <tr>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="text-right px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEDED]">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-[#F8F8F8] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border border-[#EDEDED]"
                          />
                          <div>
                            <p className="font-poppins text-sm font-medium text-black">
                              {user.name}
                            </p>
                            <p className="font-poppins text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-[#F8F8F8] rounded-[8px] font-poppins text-xs capitalize">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-poppins text-sm text-gray-600">
                          {user.location}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-[8px] font-poppins text-xs capitalize ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-poppins text-sm text-gray-600">
                          {user.joined}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === user.id ? null : user.id)
                          }
                          className="p-2 hover:bg-[#EDEDED] rounded-[8px] transition-colors"
                        >
                          <FiMoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {openMenu === user.id && (
                          <div className="absolute right-6 top-12 bg-white border border-[#EDEDED] rounded-[10px] shadow-lg z-10 py-2 min-w-[150px]">
                            <button className="w-full px-4 py-2 text-left font-poppins text-sm text-gray-700 hover:bg-[#F8F8F8] flex items-center">
                              <FiEye className="w-4 h-4 mr-2" />
                              View Profile
                            </button>
                            {user.status === 'active' ? (
                              <button className="w-full px-4 py-2 text-left font-poppins text-sm text-red-600 hover:bg-[#F8F8F8] flex items-center">
                                <FiUserX className="w-4 h-4 mr-2" />
                                Suspend
                              </button>
                            ) : (
                              <button className="w-full px-4 py-2 text-left font-poppins text-sm text-green-600 hover:bg-[#F8F8F8] flex items-center">
                                <FiCheck className="w-4 h-4 mr-2" />
                                Activate
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </RoundedCard>
        </div>
      </main>
    </div>
  )
}
