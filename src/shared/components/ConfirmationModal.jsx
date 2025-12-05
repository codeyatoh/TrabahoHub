import React from 'react'
import { RoundedCard } from './RoundedCard'
import { FiX, FiAlertTriangle } from 'react-icons/fi'
import PropTypes from 'prop-types'

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
  isLoading = false,
}) {
  if (!isOpen) return null

  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          icon: 'text-red-500',
          button: 'bg-red-500 hover:bg-red-600',
        }
      case 'warning':
        return {
          icon: 'text-yellow-500',
          button: 'bg-yellow-500 hover:bg-yellow-600',
        }
      case 'info':
        return {
          icon: 'text-blue-500',
          button: 'bg-blue-500 hover:bg-blue-600',
        }
    }
  }

  const styles = getTypeStyles()

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <RoundedCard className="w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-start space-x-3">
              <div className={styles.icon}>
                <FiAlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-caveat text-2xl font-bold text-black">
                  {title}
                </h2>
                <p className="font-poppins text-sm text-gray-600 mt-2">
                  {message}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-2 hover:bg-[#F8F8F8] rounded-full transition-colors disabled:opacity-50"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 py-3 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 py-3 text-white font-poppins text-sm rounded-[10px] transition-colors disabled:opacity-50 ${styles.button}`}
            >
              {isLoading ? 'Processing...' : confirmText}
            </button>
          </div>
        </div>
      </RoundedCard>
    </div>
  )
}

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  type: PropTypes.oneOf(['danger', 'warning', 'info']),
  isLoading: PropTypes.bool,
}
