import React from 'react'
import { RoundedCard } from './RoundedCard'
import { FiLock, FiCheckCircle, FiAlertCircle, FiClock } from 'react-icons/fi'
import PropTypes from 'prop-types'

export function EscrowStatus({
  status,
  amount,
  releasedAmount = '₱0',
  onFund,
  onRelease,
  showActions = true,
}) {
  const getStatusConfig = () => {
    switch (status) {
      case 'not-funded':
        return {
          icon: FiAlertCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Not Funded',
          description: 'Fund this project to hire the freelancer',
        }
      case 'funded':
        return {
          icon: FiLock,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          title: 'Funds in Escrow',
          description: 'Payment secured and ready for release',
        }
      case 'released':
        return {
          icon: FiCheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Payment Released',
          description: 'Funds have been released to freelancer',
        }
      case 'disputed':
        return {
          icon: FiClock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: 'Under Dispute',
          description: 'Admin is reviewing this case',
        }
    }
  }

  const config = getStatusConfig()
  const StatusIcon = config.icon

  return (
    <RoundedCard
      className={`p-6 ${config.bgColor} border-2 ${config.borderColor}`}
    >
      <div className="flex items-start space-x-4">
        <div className={`${config.color}`}>
          <StatusIcon className="w-8 h-8" />
        </div>
        <div className="flex-1">
          <h3 className="font-poppins text-sm font-semibold text-black mb-1">
            {config.title}
          </h3>
          <p className="font-poppins text-xs text-gray-600 mb-3">
            {config.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="font-poppins text-xs text-gray-500 mb-1">
                Total Budget
              </p>
              <p className="font-caveat text-xl font-bold text-black">
                {amount}
              </p>
            </div>
            {status === 'released' && (
              <div>
                <p className="font-poppins text-xs text-gray-500 mb-1">
                  Released
                </p>
                <p className="font-caveat text-xl font-bold text-green-600">
                  {releasedAmount}
                </p>
              </div>
            )}
          </div>

          {showActions && status === 'not-funded' && onFund && (
            <button
              onClick={onFund}
              className="w-full py-3 bg-black text-white font-poppins text-sm font-medium rounded-[10px] hover:bg-gray-800 transition-colors"
            >
              Fund Project (Escrow)
            </button>
          )}

          {showActions && status === 'funded' && onRelease && (
            <button
              onClick={onRelease}
              className="w-full py-3 bg-green-500 text-white font-poppins text-sm font-medium rounded-[10px] hover:bg-green-600 transition-colors"
            >
              Release Payment
            </button>
          )}

          {status === 'funded' && (
            <div className="mt-3 p-3 bg-white rounded-[8px] border border-[#EDEDED]">
              <p className="font-poppins text-xs text-gray-600">
                <FiLock className="inline w-3 h-3 mr-1" />
                Your payment is secure. Funds will only be released when you
                approve the work.
              </p>
            </div>
          )}
        </div>
      </div>
    </RoundedCard>
  )
}

EscrowStatus.propTypes = {
  status: PropTypes.oneOf(['not-funded', 'funded', 'released', 'disputed'])
    .isRequired,
  amount: PropTypes.string.isRequired,
  releasedAmount: PropTypes.string,
  onFund: PropTypes.func,
  onRelease: PropTypes.func,
  showActions: PropTypes.bool,
}
