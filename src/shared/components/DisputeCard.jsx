import React from 'react'
import { RoundedCard } from './RoundedCard'
import { FiAlertTriangle, FiClock, FiCheckCircle } from 'react-icons/fi'
import PropTypes from 'prop-types'

export function DisputeCard({
  dispute,
  onReview,
  onResolve,
  isAdmin = false,
}) {
  const getStatusConfig = () => {
    switch (dispute.status) {
      case 'open':
        return {
          icon: FiAlertTriangle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Open',
        }
      case 'under-review':
        return {
          icon: FiClock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          label: 'Under Review',
        }
      case 'resolved':
        return {
          icon: FiCheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          label: 'Resolved',
        }
    }
  }

  const config = getStatusConfig()
  const StatusIcon = config.icon

  return (
    <RoundedCard className={`p-6 border-2 ${config.borderColor}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-3">
          <div className={config.color}>
            <StatusIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-poppins text-sm font-semibold text-black mb-1">
              {dispute.jobTitle}
            </h3>
            <p className="font-poppins text-xs text-gray-600">
              Filed by {dispute.filedBy === 'client' ? 'Client' : 'Freelancer'}{' '}
              • {dispute.filedDate}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-[8px] font-poppins text-xs font-medium ${config.bgColor} ${config.color}`}
        >
          {config.label}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-poppins text-xs text-gray-500">Client</p>
            <p className="font-poppins text-sm text-black">{dispute.client}</p>
          </div>
          <div>
            <p className="font-poppins text-xs text-gray-500">Freelancer</p>
            <p className="font-poppins text-sm text-black">
              {dispute.freelancer}
            </p>
          </div>
        </div>

        <div>
          <p className="font-poppins text-xs text-gray-500 mb-1">Reason</p>
          <p className="font-poppins text-sm font-medium text-black">
            {dispute.reason}
          </p>
        </div>

        <div>
          <p className="font-poppins text-xs text-gray-500 mb-1">Description</p>
          <p className="font-poppins text-sm text-gray-700">
            {dispute.description}
          </p>
        </div>
      </div>

      {isAdmin && dispute.status !== 'resolved' && (
        <div className="flex gap-3 pt-4 border-t border-[#EDEDED]">
          {dispute.status === 'open' && (
            <button
              onClick={() => onReview && onReview(dispute.id)}
              className="flex-1 py-2 bg-yellow-500 text-white font-poppins text-sm rounded-[10px] hover:bg-yellow-600 transition-colors"
            >
              Start Review
            </button>
          )}
          {dispute.status === 'under-review' && (
            <button
              onClick={() => onResolve && onResolve(dispute.id)}
              className="flex-1 py-2 bg-green-500 text-white font-poppins text-sm rounded-[10px] hover:bg-green-600 transition-colors"
            >
              Mark as Resolved
            </button>
          )}
          <button className="flex-1 py-2 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors">
            View Details
          </button>
        </div>
      )}
    </RoundedCard>
  )
}

DisputeCard.propTypes = {
  dispute: PropTypes.shape({
    id: PropTypes.string.isRequired,
    jobTitle: PropTypes.string.isRequired,
    client: PropTypes.string.isRequired,
    freelancer: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['open', 'under-review', 'resolved']).isRequired,
    filedBy: PropTypes.oneOf(['client', 'freelancer']).isRequired,
    filedDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onReview: PropTypes.func,
  onResolve: PropTypes.func,
  isAdmin: PropTypes.bool,
}
