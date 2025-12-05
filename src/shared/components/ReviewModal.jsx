import React, { useState } from 'react'
import { RoundedCard } from './RoundedCard'
import { FiX, FiStar } from 'react-icons/fi'
import PropTypes from 'prop-types'

export function ReviewModal({
  isOpen,
  onClose,
  onSubmit,
  recipientName,
  recipientRole,
}) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [review, setReview] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (rating > 0) {
      onSubmit(rating, review)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <RoundedCard className="w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-caveat text-2xl font-bold text-black">
              Rate {recipientRole === 'client' ? 'Client' : 'Freelancer'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#F8F8F8] rounded-full"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="font-poppins text-sm text-gray-600 mb-4 text-center">
                How was your experience working with {recipientName}?
              </p>

              {/* Star Rating */}
              <div className="flex justify-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <FiStar
                      className={`w-8 h-8 ${star <= (hoveredRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center font-poppins text-xs text-gray-500">
                {rating === 0
                  ? 'Click to rate'
                  : rating === 1
                    ? 'Poor'
                    : rating === 2
                      ? 'Fair'
                      : rating === 3
                        ? 'Good'
                        : rating === 4
                          ? 'Very Good'
                          : 'Excellent'}
              </p>
            </div>

            <div>
              <label className="block font-poppins text-sm font-medium text-black mb-2">
                Your Review (Optional)
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience..."
                rows={4}
                className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={rating === 0}
                className="flex-1 py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </RoundedCard>
    </div>
  )
}

ReviewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  recipientName: PropTypes.string.isRequired,
  recipientRole: PropTypes.oneOf(['client', 'freelancer']).isRequired,
}
