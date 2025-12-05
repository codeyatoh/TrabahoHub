import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { FiDollarSign, FiCalendar, FiPlus, FiTrash2 } from 'react-icons/fi'
import { Select } from '../../../shared/components/Select'
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

export function PostJob() {
  const navigate = useNavigate()
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
  const updateMilestone = (
    id,
    field,
    value,
  ) => {
    setMilestones(
      milestones.map((m) =>
        m.id === id
          ? {
              ...m,
              [field]: value,
            }
          : m,
      ),
    )
  }
  const calculateTotalMilestones = () => {
    return milestones.reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock submit
    navigate('/client/dashboard')
  }
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Post a New Job
            </h1>
            <p className="font-poppins text-gray-600">
              Describe your project and find the perfect freelancer
            </p>
          </div>

          <RoundedCard className="p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g., Build a sari-sari store website"
                  className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>

              {/* Category */}
              <Select
                label="Category"
                value={formData.category}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    category: value,
                  })
                }
                options={categoryOptions}
                placeholder="Select a category"
              />

              {/* Description */}
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your project in detail. What do you need? What are your requirements?"
                  rows={6}
                  className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  required
                />
              </div>

              {/* Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-poppins text-sm font-medium text-black mb-2">
                    Total Budget (PHP)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-poppins text-gray-500">
                      ₱
                    </span>
                    <input
                      type="number"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          budget: e.target.value,
                        })
                      }
                      placeholder="10,000"
                      className="w-full pl-8 pr-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                      required
                      disabled={useMilestones}
                    />
                  </div>
                  {useMilestones && (
                    <p className="font-poppins text-xs text-gray-500 mt-1">
                      Total: ₱{calculateTotalMilestones().toLocaleString()}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block font-poppins text-sm font-medium text-black mb-2">
                    Budget Type
                  </label>
                  <div className="flex bg-[#F8F8F8] rounded-[10px] p-1 border border-[#EDEDED]">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          budgetType: 'fixed',
                        })
                      }
                      className={`flex-1 py-2 font-poppins text-sm rounded-[8px] transition-all ${formData.budgetType === 'fixed' ? 'bg-black text-white' : 'text-gray-600'}`}
                    >
                      Fixed
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          budgetType: 'hourly',
                        })
                      }
                      className={`flex-1 py-2 font-poppins text-sm rounded-[8px] transition-all ${formData.budgetType === 'hourly' ? 'bg-black text-white' : 'text-gray-600'}`}
                    >
                      Hourly
                    </button>
                  </div>
                </div>
              </div>

              {/* Milestones Toggle */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-[10px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-poppins text-sm font-medium text-black">
                      Use Milestones
                    </p>
                    <p className="font-poppins text-xs text-gray-600">
                      Split project into smaller deliverables with separate
                      payments
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUseMilestones(!useMilestones)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${useMilestones ? 'bg-black' : 'bg-gray-300'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${useMilestones ? 'translate-x-6' : 'translate-x-1'}`}
                    />
                  </button>
                </div>
              </div>

              {/* Milestones Section */}
              {useMilestones && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block font-poppins text-sm font-medium text-black">
                      Project Milestones
                    </label>
                    <button
                      type="button"
                      onClick={addMilestone}
                      className="inline-flex items-center px-3 py-1 bg-black text-white font-poppins text-xs rounded-[8px] hover:bg-gray-800 transition-colors"
                    >
                      <FiPlus className="w-3 h-3 mr-1" />
                      Add Milestone
                    </button>
                  </div>

                  {milestones.map((milestone, index) => (
                    <div
                      key={milestone.id}
                      className="p-4 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-poppins text-sm font-medium text-black">
                          Milestone {index + 1}
                        </p>
                        {milestones.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMilestone(milestone.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        value={milestone.title}
                        onChange={(e) =>
                          updateMilestone(milestone.id, 'title', e.target.value)
                        }
                        placeholder="Milestone title (e.g., Design Phase)"
                        className="w-full px-3 py-2 bg-white border border-[#EDEDED] rounded-[8px] font-poppins text-sm focus:outline-none focus:border-black"
                        required={useMilestones}
                      />

                      <textarea
                        value={milestone.description}
                        onChange={(e) =>
                          updateMilestone(
                            milestone.id,
                            'description',
                            e.target.value,
                          )
                        }
                        placeholder="What needs to be delivered?"
                        rows={2}
                        className="w-full px-3 py-2 bg-white border border-[#EDEDED] rounded-[8px] font-poppins text-sm focus:outline-none focus:border-black resize-none"
                        required={useMilestones}
                      />

                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-poppins text-xs text-gray-500">
                            ₱
                          </span>
                          <input
                            type="number"
                            value={milestone.amount}
                            onChange={(e) =>
                              updateMilestone(
                                milestone.id,
                                'amount',
                                e.target.value,
                              )
                            }
                            placeholder="Amount"
                            className="w-full pl-6 pr-3 py-2 bg-white border border-[#EDEDED] rounded-[8px] font-poppins text-sm focus:outline-none focus:border-black"
                            required={useMilestones}
                          />
                        </div>
                        <input
                          type="date"
                          value={milestone.dueDate}
                          onChange={(e) =>
                            updateMilestone(
                              milestone.id,
                              'dueDate',
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 bg-white border border-[#EDEDED] rounded-[8px] font-poppins text-sm focus:outline-none focus:border-black"
                          required={useMilestones}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Deadline */}
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Project Deadline
                </label>
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deadline: e.target.value,
                      })
                    }
                    className="w-full pl-12 pr-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="block font-poppins text-sm font-medium text-black mb-2">
                  Required Skills
                </label>
                <input
                  type="text"
                  value={formData.skills}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      skills: e.target.value,
                    })
                  }
                  placeholder="e.g., React, Node.js, Figma (comma separated)"
                  className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 bg-[#F8F8F8] text-black font-poppins text-sm font-medium rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-black text-white font-poppins text-sm font-medium rounded-[10px] hover:bg-gray-800 transition-colors"
                >
                  Post Job
                </button>
              </div>
            </form>
          </RoundedCard>
        </div>
      </main>

      <BottomNav role="client" />
    </div>
  )
}

export default PostJob;
