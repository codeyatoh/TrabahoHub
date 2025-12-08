import React, { useState } from 'react'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'
import { FiX, FiDollarSign, FiCalendar, FiPlus, FiTrash2 } from 'react-icons/fi'
import { Select } from './Select'
import { addJob, updateJob } from '../../services/mockData'
import { useUser } from '../../context/UserContext'

const categories = [
  'Web Development',
  'Graphic Design',
  'Social Media',
  'Virtual Assistant',
  'Video Editing',
  'Writing / Copywriting',
  'Mobile Development',
  'Data Entry',
  'Other',
]

export function PostJobModal({ isOpen, onClose, jobToEdit = null }) {
  const { currentUser } = useUser()
  const [useMilestones, setUseMilestones] = useState(false)
  const [milestones, setMilestones] = useState([
    {
      id: '1',
      title: '',
      amount: '',
      description: '',
      dueDate: '',
    },
  ])
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budget: '',
    budgetType: 'fixed',
    deadline: '',
    skills: '',
  })

  // Reset or Populate form when modal opens
  React.useEffect(() => {
    if (isOpen) {
      if (jobToEdit) {
        // Edit Mode
        setFormData({
          title: jobToEdit.title || '',
          category: jobToEdit.category || '',
          description: jobToEdit.description || '',
          budget: jobToEdit.budget ? jobToEdit.budget.replace(/[^0-9.]/g, '') : '',
          budgetType: jobToEdit.budgetType || 'fixed',
          deadline: jobToEdit.deadline || '',
          skills: jobToEdit.skills ? jobToEdit.skills.join(', ') : '',
        })
        if (jobToEdit.milestones && jobToEdit.milestones.length > 0) {
          setUseMilestones(true)
          setMilestones(jobToEdit.milestones.map(m => ({
            ...m,
            amount: m.amount ? m.amount.replace(/[^0-9.]/g, '') : ''
          })))
        } else {
          setUseMilestones(false)
          setMilestones([{ id: '1', title: '', amount: '', description: '', dueDate: '' }])
        }
      } else {
        // Create Mode
        setFormData({
          title: '',
          category: '',
          description: '',
          budget: '',
          budgetType: 'fixed',
          deadline: '',
          skills: '',
        })
        setUseMilestones(false)
        setMilestones([{
          id: '1',
          title: '',
          amount: '',
          description: '',
          dueDate: '',
        }])
      }
    }
  }, [isOpen, jobToEdit])

  const categoryOptions = categories.map((cat) => ({
    value: cat,
    label: cat,
  }))

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        id: String(Date.now()),
        title: '',
        amount: '',
        description: '',
        dueDate: '',
      },
    ])
  }

  const removeMilestone = (id) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id))
    }
  }

  const updateMilestoneData = (id, field, value) => {
    setMilestones(
      milestones.map((m) =>
        m.id === id ? { ...m, [field]: value } : m
      )
    )
  }

  const calculateTotalMilestones = () => {
    return milestones.reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const commonData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      budget: `₱${parseFloat(formData.budget).toLocaleString()}`,
      budgetType: formData.budgetType,
      deadline: formData.deadline,
      skills: formData.skills.split(',').map(s => s.trim()),
      // Milestones
      milestones: useMilestones ? milestones.map(m => ({
        ...m,
        amount: `₱${parseFloat(m.amount).toLocaleString()}`,
        status: m.status || 'pending' 
      })) : []
    }

    if (jobToEdit) {
      // Update existing job
      updateJob(jobToEdit.id, commonData)
      toast.success('Job updated successfully!')
    } else {
      // Create new job
      const newJob = {
        ...commonData,
        clientId: currentUser?.id,
        clientName: currentUser?.name || 'Client',
        posted: 'Just now',
      }
      addJob(newJob)
      toast.success('Job posted successfully!')
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-caveat text-3xl font-bold text-black">
                {jobToEdit ? 'Edit Job' : 'Post a New Job'}
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job Title */}
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">Job Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., E-commerce Website Development"
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">Category</label>
                <Select
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Select a category"
                  className="w-full"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">Description</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Describe the project requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              {/* Skills */}
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">Required Skills (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., React, Node.js, Design"
                  className="w-full px-4 py-3 border border-gray-300 rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                />
              </div>

              {/* Budget & Deadline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-sm font-medium text-black mb-2">Budget (₱)</label>
                  <div className="relative">
                    <FiDollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      required
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-poppins text-sm font-medium text-black mb-2">Deadline</label>
                  <div className="relative">
                    <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Milestones Toggle */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-poppins text-sm font-medium text-black">Project Milestones</span>
                  <button
                    type="button"
                    onClick={() => setUseMilestones(!useMilestones)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${useMilestones ? 'bg-black' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${useMilestones ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>

                {useMilestones && (
                  <div className="space-y-4">
                    {milestones.map((milestone, index) => (
                      <div key={milestone.id} className="bg-gray-50 p-4 rounded-[10px] relative group">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => removeMilestone(milestone.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            disabled={milestones.length === 1}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                        <h4 className="font-poppins text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                          Milestone {index + 1}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <input
                            type="text"
                            placeholder="Milestone Title"
                            required
                            className="px-3 py-2 border border-gray-300 rounded-[8px] text-sm font-poppins"
                            value={milestone.title}
                            onChange={(e) => updateMilestoneData(milestone.id, 'title', e.target.value)}
                          />
                          <input
                            type="number"
                            placeholder="Amount (₱)"
                            required
                            className="px-3 py-2 border border-gray-300 rounded-[8px] text-sm font-poppins"
                            value={milestone.amount}
                            onChange={(e) => updateMilestoneData(milestone.id, 'amount', e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                           <input
                            type="date"
                             required
                            className="px-3 py-2 border border-gray-300 rounded-[8px] text-sm font-poppins"
                            value={milestone.dueDate}
                            onChange={(e) => updateMilestoneData(milestone.id, 'dueDate', e.target.value)}
                           />
                          <textarea
                            placeholder="Description"
                            rows="2"
                            className="px-3 py-2 border border-gray-300 rounded-[8px] text-sm font-poppins resize-none"
                            value={milestone.description}
                            onChange={(e) => updateMilestoneData(milestone.id, 'description', e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-center justify-between pt-2">
                       <p className="font-poppins text-sm text-gray-600">
                        Total: <span className="font-bold">₱{calculateTotalMilestones().toLocaleString()}</span>
                         {parseFloat(formData.budget) > 0 && calculateTotalMilestones() !== parseFloat(formData.budget) && (
                            <span className="text-red-500 text-xs ml-2">(Must match budget: ₱{parseFloat(formData.budget).toLocaleString()})</span>
                         )}
                       </p>
                       <button
                        type="button"
                        onClick={addMilestone}
                        className="flex items-center text-sm font-medium text-black hover:text-gray-700"
                       >
                         <FiPlus className="mr-1" /> Add Milestone
                       </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 -mx-6 -mb-4 px-6 py-4 flex justify-end space-x-3 rounded-b-lg">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-[8px] text-sm font-poppins font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-black text-white rounded-[8px] text-sm font-poppins font-medium hover:bg-gray-800 transition-colors"
                >
                  Post Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

PostJobModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}
