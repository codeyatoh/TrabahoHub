import React from 'react'
import { RoundedCard } from './RoundedCard'
import { FiCheckCircle, FiCircle, FiClock } from 'react-icons/fi'
import PropTypes from 'prop-types'

export function MilestoneTracker({
  milestones,
  onApprove,
  onSubmit,
  userRole,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500'
      case 'in-progress':
        return 'text-blue-500'
      case 'approved':
        return 'text-green-600'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return FiCheckCircle
      case 'in-progress':
        return FiClock
      default:
        return FiCircle
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Not Started'
      case 'in-progress':
        return 'In Progress'
      case 'completed':
        return 'Awaiting Approval'
      case 'approved':
        return 'Approved & Paid'
      default:
        return status
    }
  }

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => {
        const StatusIcon = getStatusIcon(milestone.status)
        return (
          <RoundedCard key={milestone.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div
                  className={`w-8 h-8 rounded-full bg-[#F8F8F8] flex items-center justify-center ${getStatusColor(milestone.status)}`}
                >
                  <StatusIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-poppins text-sm font-medium text-black">
                      Milestone {index + 1}: {milestone.title}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-[6px] font-poppins text-xs ${milestone.status === 'approved' ? 'bg-green-100 text-green-800' : milestone.status === 'completed' ? 'bg-blue-100 text-blue-800' : milestone.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'}`}
                    >
                      {getStatusText(milestone.status)}
                    </span>
                  </div>
                  <p className="font-poppins text-xs text-gray-600 mb-2">
                    {milestone.description}
                  </p>
                  <p className="font-poppins text-xs text-gray-500">
                    Due: {milestone.dueDate}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-caveat text-xl font-bold text-black">
                  {milestone.amount}
                </p>
              </div>
            </div>

            {/* Actions */}
            {userRole === 'client' && milestone.status === 'completed' && (
              <div className="flex gap-3 pt-4 border-t border-[#EDEDED]">
                <button
                  onClick={() => onApprove && onApprove(milestone.id)}
                  className="flex-1 py-2 bg-green-500 text-white font-poppins text-sm rounded-[10px] hover:bg-green-600 transition-colors"
                >
                  Approve & Release Payment
                </button>
                <button className="flex-1 py-2 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors">
                  Request Revision
                </button>
              </div>
            )}

            {userRole === 'freelancer' &&
              milestone.status === 'in-progress' && (
                <div className="pt-4 border-t border-[#EDEDED]">
                  <button
                    onClick={() => onSubmit && onSubmit(milestone.id)}
                    className="w-full py-2 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                  >
                    Submit for Review
                  </button>
                </div>
              )}
          </RoundedCard>
        )
      })}
    </div>
  )
}

MilestoneTracker.propTypes = {
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['pending', 'in-progress', 'completed', 'approved'])
        .isRequired,
      dueDate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onApprove: PropTypes.func,
  onSubmit: PropTypes.func,
  userRole: PropTypes.oneOf(['client', 'freelancer']).isRequired,
}
