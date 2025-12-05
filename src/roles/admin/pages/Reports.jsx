import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiCheck,
  FiX,
  FiMessageSquare,
} from 'react-icons/fi'

const mockReports = [
  {
    id: '1',
    type: 'Dispute',
    title: 'Payment not received after job completion',
    reporter: 'Maria Santos',
    reporterRole: 'Freelancer',
    against: 'Carlo Mendoza',
    location: 'Cebu',
    status: 'pending',
    priority: 'high',
    date: '2 hours ago',
    description:
      'Client marked job as complete but payment has not been released after 5 days.',
  },
  {
    id: '2',
    type: 'Fraud',
    title: 'Suspicious account activity',
    reporter: 'System',
    reporterRole: 'Automated',
    against: 'Unknown User',
    location: 'Manila',
    status: 'pending',
    priority: 'urgent',
    date: '5 hours ago',
    description:
      'Multiple failed login attempts detected from different IP addresses.',
  },
  {
    id: '3',
    type: 'Quality',
    title: 'Delivered work does not match requirements',
    reporter: 'Rina Villanueva',
    reporterRole: 'Client',
    against: 'Juan Reyes',
    location: 'Makati',
    status: 'resolved',
    priority: 'medium',
    date: '1 day ago',
    description:
      'The logo design delivered was completely different from what was discussed.',
  },
  {
    id: '4',
    type: 'Harassment',
    title: 'Inappropriate messages from client',
    reporter: 'Ana Garcia',
    reporterRole: 'Freelancer',
    against: 'Mark Torres',
    location: 'Davao',
    status: 'dismissed',
    priority: 'low',
    date: '3 days ago',
    description: 'Client sent multiple messages outside of business hours.',
  },
]

export function Reports() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedReport, setSelectedReport] = useState(null)
  
  const filteredReports =
    statusFilter === 'all'
      ? mockReports
      : mockReports.filter((r) => r.status === statusFilter)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="admin" />

      <main className="flex-1 lg:ml-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Reports & Disputes
            </h1>
            <p className="font-poppins text-gray-600">
              Handle user reports and platform disputes
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <RoundedCard className="p-4 text-center">
              <p className="font-caveat text-3xl font-bold text-black">23</p>
              <p className="font-poppins text-xs text-gray-500">
                Total Reports
              </p>
            </RoundedCard>
            <RoundedCard className="p-4 text-center bg-red-50">
              <p className="font-caveat text-3xl font-bold text-red-600">5</p>
              <p className="font-poppins text-xs text-red-600">Urgent</p>
            </RoundedCard>
            <RoundedCard className="p-4 text-center bg-yellow-50">
              <p className="font-caveat text-3xl font-bold text-yellow-600">
                8
              </p>
              <p className="font-poppins text-xs text-yellow-600">Pending</p>
            </RoundedCard>
            <RoundedCard className="p-4 text-center bg-green-50">
              <p className="font-caveat text-3xl font-bold text-green-600">
                10
              </p>
              <p className="font-poppins text-xs text-green-600">Resolved</p>
            </RoundedCard>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['all', 'pending', 'resolved', 'dismissed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-[10px] font-poppins text-sm capitalize whitespace-nowrap transition-colors ${statusFilter === status ? 'bg-black text-white' : 'bg-white text-gray-600 border border-[#EDEDED] hover:bg-[#F8F8F8]'}`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <RoundedCard
                key={report.id}
                hover
                onClick={() => setSelectedReport(report)}
                className="p-6 cursor-pointer"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span
                        className={`w-2 h-2 rounded-full ${getPriorityColor(report.priority)}`}
                      />
                      <span className="px-2 py-1 bg-[#F8F8F8] rounded-[6px] font-poppins text-xs">
                        {report.type}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-[6px] font-poppins text-xs capitalize ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : report.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <h3 className="font-caveat text-xl font-semibold text-black mb-1">
                      {report.title}
                    </h3>
                    <p className="font-poppins text-sm text-gray-600 mb-2">
                      Reported by {report.reporter} ({report.reporterRole}) •
                      Against {report.against}
                    </p>
                    <p className="font-poppins text-sm text-gray-500">
                      {report.location} • {report.date}
                    </p>
                  </div>
                  {report.status === 'pending' && (
                    <div className="flex gap-2 mt-4 lg:mt-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="px-4 py-2 bg-green-500 text-white font-poppins text-sm rounded-[10px] hover:bg-green-600 transition-colors flex items-center"
                      >
                        <FiCheck className="w-4 h-4 mr-1" />
                        Resolve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        className="px-4 py-2 bg-[#F8F8F8] text-gray-600 font-poppins text-sm rounded-[10px] hover:bg-[#EDEDED] transition-colors flex items-center"
                      >
                        <FiX className="w-4 h-4 mr-1" />
                        Dismiss
                      </button>
                    </div>
                  )}
                </div>
              </RoundedCard>
            ))}
          </div>

          {/* Report Detail Modal */}
          {selectedReport && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <RoundedCard className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span
                          className={`w-2 h-2 rounded-full ${getPriorityColor(selectedReport.priority)}`}
                        />
                        <span className="font-poppins text-xs text-gray-500 uppercase">
                          {selectedReport.priority} priority
                        </span>
                      </div>
                      <h2 className="font-caveat text-2xl font-bold text-black">
                        {selectedReport.title}
                      </h2>
                    </div>
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="p-2 hover:bg-[#F8F8F8] rounded-[8px]"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-poppins text-xs text-gray-500 mb-1">
                          Reporter
                        </p>
                        <p className="font-poppins text-sm text-black">
                          {selectedReport.reporter}
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          {selectedReport.reporterRole}
                        </p>
                      </div>
                      <div>
                        <p className="font-poppins text-xs text-gray-500 mb-1">
                          Reported User
                        </p>
                        <p className="font-poppins text-sm text-black">
                          {selectedReport.against}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-poppins text-xs text-gray-500 mb-1">
                        Description
                      </p>
                      <p className="font-poppins text-sm text-gray-700">
                        {selectedReport.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#EDEDED]">
                    <button className="flex-1 py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors flex items-center justify-center">
                      <FiMessageSquare className="w-4 h-4 mr-2" />
                      Contact Users
                    </button>
                    <button className="flex-1 py-3 bg-green-500 text-white font-poppins text-sm rounded-[10px] hover:bg-green-600 transition-colors flex items-center justify-center">
                      <FiCheck className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </button>
                    <button className="flex-1 py-3 bg-[#F8F8F8] text-gray-600 font-poppins text-sm rounded-[10px] hover:bg-[#EDEDED] transition-colors flex items-center justify-center">
                      <FiX className="w-4 h-4 mr-2" />
                      Dismiss
                    </button>
                  </div>
                </div>
              </RoundedCard>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
