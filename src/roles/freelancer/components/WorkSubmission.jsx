import React, { useState } from 'react'
import { FiLink, FiUpload, FiSend } from 'react-icons/fi'
import { submitWork } from '../../../services/api'
import { toast } from 'react-toastify'

export function WorkSubmission({ jobId }) {
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!description) return

    setIsSubmitting(true)
    try {
      await submitWork(jobId, { description, link })
      toast.success('Work submitted successfully!')
      setDescription('')
      setLink('')
    } catch (error) {
      toast.error('Failed to submit work. Please try again.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="font-caveat text-2xl font-bold text-black mb-4">
        Submit Progress
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-poppins text-sm font-medium text-black mb-2">
            Progress Update
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you've accomplished..."
            rows={5}
            className="w-full px-4 py-3 bg-white border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors resize-none"
            required
          />
        </div>

        <div>
          <label className="block font-poppins text-sm font-medium text-black mb-2">
            Link to Work (Optional)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <FiLink />
            </span>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center py-3 bg-black text-white font-poppins text-sm font-medium rounded-[10px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            'Submitting...'
          ) : (
            <>
              <FiSend className="w-4 h-4 mr-2" />
              Submit Work
            </>
          )}
        </button>
      </form>
    </div>
  )
}
