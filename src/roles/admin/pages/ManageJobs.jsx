import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiSearch,
  FiMoreVertical,
  FiEye,
  FiTrash2,
} from 'react-icons/fi'

const mockJobs = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    client: 'Carlo Mendoza',
    budget: '₱25,000',
    status: 'active',
    bids: 8,
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'Logo Design for Coffee Shop',
    client: 'Rina Villanueva',
    budget: '₱5,000',
    status: 'completed',
    bids: 15,
    posted: '1 week ago',
  },
  {
    id: '3',
    title: 'Social Media Management',
    client: 'Mark Torres',
    budget: '₱15,000/mo',
    status: 'active',
    bids: 6,
    posted: '3 days ago',
  },
  {
    id: '4',
    title: 'Mobile App Development',
    client: 'Jenny Lim',
    budget: '₱50,000',
    status: 'active',
    bids: 12,
    posted: '1 day ago',
  },
  {
    id: '5',
    title: 'Video Editing for YouTube',
    client: 'Sofia Cruz',
    budget: '₱3,000/video',
    status: 'cancelled',
    bids: 4,
    posted: '5 days ago',
  },
]

export function ManageJobs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [openMenu, setOpenMenu] = useState(null)
  
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="admin" />

      <main className="flex-1 lg:ml-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Manage Jobs
            </h1>
            <p className="font-poppins text-gray-600">
              View and manage platform job listings
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
                  placeholder="Search jobs..."
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {['all', 'active', 'completed', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-[10px] font-poppins text-sm capitalize whitespace-nowrap transition-colors ${statusFilter === status ? 'bg-black text-white' : 'bg-[#F8F8F8] text-gray-600 hover:bg-[#EDEDED]'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </RoundedCard>

          {/* Jobs Table */}
          <RoundedCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F8F8] border-b border-[#EDEDED]">
                  <tr>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job
                    </th>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Budget
                    </th>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bids
                    </th>
                    <th className="text-left px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-right px-6 py-4 font-poppins text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EDEDED]">
                  {filteredJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-[#F8F8F8] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-poppins text-sm font-medium text-black">
                            {job.title}
                          </p>
                          <p className="font-poppins text-xs text-gray-500">
                            Posted {job.posted}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-poppins text-sm text-gray-600">
                          {job.client}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-caveat text-lg font-bold text-black">
                          {job.budget}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-poppins text-sm text-gray-600">
                          {job.bids}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-[8px] font-poppins text-xs capitalize ${job.status === 'active' ? 'bg-black text-white' : job.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right relative">
                        <button
                          onClick={() =>
                            setOpenMenu(openMenu === job.id ? null : job.id)
                          }
                          className="p-2 hover:bg-[#EDEDED] rounded-[8px] transition-colors"
                        >
                          <FiMoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        {openMenu === job.id && (
                          <div className="absolute right-6 top-12 bg-white border border-[#EDEDED] rounded-[10px] shadow-lg z-10 py-2 min-w-[150px]">
                            <button className="w-full px-4 py-2 text-left font-poppins text-sm text-gray-700 hover:bg-[#F8F8F8] flex items-center">
                              <FiEye className="w-4 h-4 mr-2" />
                              View Details
                            </button>
                            <button className="w-full px-4 py-2 text-left font-poppins text-sm text-red-600 hover:bg-[#F8F8F8] flex items-center">
                              <FiTrash2 className="w-4 h-4 mr-2" />
                              Remove
                            </button>
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
