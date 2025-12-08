import React from 'react'
import { FiCheckCircle, FiCircle, FiLoader, FiLock } from 'react-icons/fi'

export function MilestoneList({ milestones = [] }) {
  if (!milestones.length) {
    return (
      <div className="text-center py-8 text-gray-500 font-poppins">
        No milestones defined for this job.
      </div>
    )
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <FiCheckCircle className="w-5 h-5 text-green-500" />
      case 'in-progress':
        return <FiLoader className="w-5 h-5 text-blue-500 animate-spin" />
      case 'pending':
        return <FiCircle className="w-5 h-5 text-gray-400" />
      default:
        return <FiLock className="w-5 h-5 text-gray-300" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-50'
      case 'in-progress':
        return 'text-blue-600 bg-blue-50'
      case 'pending':
        return 'text-yellow-600 bg-yellow-50'
      default:
        return 'text-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-caveat text-2xl font-bold text-black mb-4">
        Project Milestones
      </h3>
      <div className="space-y-3">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="flex items-start p-4 bg-white border border-[#EDEDED] rounded-[10px] hover:shadow-sm transition-shadow"
          >
            <div className="mt-1 mr-4">{getStatusIcon(milestone.status)}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-poppins font-medium text-black">
                  {milestone.title}
                </h4>
                <span className="font-caveat text-lg font-bold text-black">
                  {milestone.amount}
                </span>
              </div>
              <p className="font-poppins text-sm text-gray-500 mb-2">
                {milestone.description}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-[6px] font-poppins text-xs capitalize ${getStatusColor(
                    milestone.status
                  )}`}
                >
                  {milestone.status}
                </span>
                {milestone.dueDate && (
                  <span className="font-poppins text-xs text-gray-400">
                    Due: {milestone.dueDate}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
