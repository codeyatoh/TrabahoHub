import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { getJobById } from '../../../services/mockData'
import { useUser } from '../../../context/UserContext'
import { MilestoneList } from '../components/MilestoneList'
import { WorkSubmission } from '../components/WorkSubmission'
import { toast } from 'react-toastify'
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiUser,
  FiCheckCircle,
  FiList,
  FiUpload,
} from 'react-icons/fi'

export default function FreelancerJobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentUser } = useUser()
  const [job, setJob] = useState(null)
  
  // Tab state for Workroom
  const [activeTab, setActiveTab] = useState('overview')

  // Bidding state
  const [bidAmount, setBidAmount] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [proposal, setProposal] = useState('')

  useEffect(() => {
    // In a real app, this would be an async API call
    const jobData = getJobById(id)
    if (jobData) {
      setJob(jobData)
    }
  }, [id])

  if (!job) {
    return <div>Loading...</div>
  }

  // Determine if the current freelancer is hired for this job
  const isHired = job.hiredFreelancerId === currentUser?.id

  // Bidding Handler
  const handleSubmitBid = (e) => {
    e.preventDefault()
    toast.success('Bid submitted successfully!')
    navigate('/freelancer/dashboard')
  }

  // Workroom Tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <h3 className="font-caveat text-xl font-bold text-black mb-2">Description</h3>
              <p className="font-poppins text-gray-700 whitespace-pre-line leading-relaxed">
                {job.description}
              </p>
            </div>
            
            <div>
              <h3 className="font-caveat text-xl font-bold text-black mb-3">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#F8F8F8] rounded-[8px] font-poppins text-xs text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      case 'milestones':
        return <MilestoneList milestones={job.milestones} />
      case 'submission':
        return <WorkSubmission jobId={job.id} />
      default:
        return null
    }
  }

  // Render Workroom Layout
  if (isHired) {
    return (
      <div className="min-h-screen bg-[#F8F8F8] flex">
        <Sidebar role="freelancer" />
        <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <Link
              to="/freelancer/my-jobs"
              className="inline-flex items-center font-poppins text-sm text-gray-600 hover:text-black mb-6"
            >
              <FiArrowLeft className="w-4 h-4 mr-2" />
              Back to My Jobs
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <RoundedCard className="p-0 overflow-hidden">
                  <div className="p-6 lg:p-8 bg-black text-white">
                    <div className="flex justify-between items-start mb-4">
                      <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-poppins backdrop-blur-sm">
                        Active Contract
                      </span>
                      <span className="font-caveat text-2xl font-bold">
                        {job.budget}
                      </span>
                    </div>
                    <h1 className="font-caveat text-3xl font-bold mb-2">
                      {job.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-gray-300 font-poppins text-sm">
                       <span className="flex items-center">
                         <FiUser className="w-4 h-4 mr-1" />
                         {job.clientName}
                       </span>
                       <span className="flex items-center">
                         <FiClock className="w-4 h-4 mr-1" />
                         Due: {job.deadline}
                       </span>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-[#EDEDED] px-6 lg:px-8 pt-4">
                     {[
                       { id: 'overview', label: 'Overview', icon: FiList },
                       { id: 'milestones', label: 'Milestones', icon: FiCheckCircle },
                       { id: 'submission', label: 'Submit Work', icon: FiUpload },
                     ].map((tab) => (
                       <button
                         key={tab.id}
                         onClick={() => setActiveTab(tab.id)}
                         className={`flex items-center mr-8 pb-4 font-poppins text-sm font-medium transition-colors border-b-2 ${
                           activeTab === tab.id
                             ? 'border-black text-black'
                             : 'border-transparent text-gray-500 hover:text-gray-700'
                         }`}
                       >
                         <tab.icon className="w-4 h-4 mr-2" />
                         {tab.label}
                       </button>
                     ))}
                  </div>

                  <div className="p-6 lg:p-8">
                    {renderTabContent()}
                  </div>
                </RoundedCard>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-1 space-y-6">
                <RoundedCard className="p-6">
                   <h3 className="font-caveat text-xl font-bold text-black mb-4">Contract Status</h3>
                   <div className="space-y-4">
                     <div>
                       <div className="flex justify-between text-sm font-poppins mb-1">
                         <span className="text-gray-500">Project Budget</span>
                         <span className="font-medium text-black">{job.budget}</span>
                       </div>
                       <div className="flex justify-between text-sm font-poppins mb-1">
                         <span className="text-gray-500">Escrow</span>
                         <span className="text-green-600 font-medium">{job.escrowStatus === 'funded' ? 'Funded' : 'Unfunded'}</span>
                       </div>
                     </div>
                     <div className="pt-4 border-t border-[#EDEDED]">
                        <p className="text-xs text-gray-500 font-poppins">
                          Payments are released upon milestone approval.
                        </p>
                     </div>
                   </div>
                </RoundedCard>
              </div>
            </div>
          </div>
        </main>
        <BottomNav role="freelancer" />
      </div>
    )
  }

  // Default Bidding View (Existing Logic)
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <Link
            to="/freelancer/browse-jobs"
            className="inline-flex items-center font-poppins text-sm text-gray-600 hover:text-black mb-6"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <RoundedCard className="p-6 lg:p-8">
                <h1 className="font-caveat text-3xl font-bold text-black mb-4">
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
                  {job.client?.location && (
                    <span className="flex items-center font-poppins text-sm">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      {job.client.location}
                    </span>
                  )}
                  <span className="flex items-center font-poppins text-sm">
                    <FiClock className="w-4 h-4 mr-1" />
                    Posted {job.posted}
                  </span>
                  <span className="px-3 py-1 bg-[#F8F8F8] rounded-[8px] font-poppins text-xs">
                    {job.category}
                  </span>
                </div>

                <div className="prose max-w-none mb-6">
                  <p className="font-poppins text-gray-700 whitespace-pre-line leading-relaxed">
                    {job.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#F8F8F8] rounded-[8px] font-poppins text-xs text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-[#EDEDED]">
                  <div>
                    <p className="font-poppins text-xs text-gray-500 mb-1">
                      Budget
                    </p>
                    <p className="font-caveat text-xl font-bold text-black">
                      {job.budget}
                    </p>
                    <p className="font-poppins text-xs text-gray-500">
                      {job.budgetType}
                    </p>
                  </div>
                  <div>
                    <p className="font-poppins text-xs text-gray-500 mb-1">
                      Deadline
                    </p>
                    <p className="font-poppins text-sm font-medium text-black">
                      {job.deadline}
                    </p>
                  </div>
                </div>
              </RoundedCard>

              {/* Submit Bid Form */}
              <RoundedCard className="p-6 lg:p-8">
                <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                  Submit Your Bid
                </h2>
                <form onSubmit={handleSubmitBid} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Your Bid Amount (PHP)
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-poppins text-gray-500">
                          ₱
                        </span>
                        <input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          placeholder="15,000"
                          className="w-full pl-8 pr-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Delivery Time
                      </label>
                      <input
                        type="text"
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        placeholder="e.g., 2 weeks"
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-poppins text-sm font-medium text-black mb-2">
                      Your Proposal
                    </label>
                    <textarea
                      value={proposal}
                      onChange={(e) => setProposal(e.target.value)}
                      placeholder="Introduce yourself and explain why you're the best fit for this project..."
                      rows={6}
                      className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white font-poppins text-sm font-medium rounded-[10px] hover:bg-gray-800 transition-colors"
                  >
                    Submit Bid
                  </button>
                </form>
              </RoundedCard>
            </div>

            {/* Client Info (Bidding View Only) */}
            <div className="lg:col-span-1">
              <RoundedCard className="p-6">
                <h3 className="font-caveat text-xl font-bold text-black mb-4">
                  About the Client
                </h3>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-[#F8F8F8] rounded-full flex items-center justify-center">
                    <FiUser className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-poppins text-sm font-medium text-black">
                      {job.clientName || 'Client'}
                    </p>
                    <p className="font-poppins text-xs text-gray-500">
                      {job.client?.location || 'Philippines'}
                    </p>
                  </div>
                </div>
                {job.client && (
                    <div className="space-y-3 pt-4 border-t border-[#EDEDED]">
                    <div className="flex justify-between">
                        <span className="font-poppins text-xs text-gray-500">
                        Member since
                        </span>
                        <span className="font-poppins text-xs text-black">
                        {job.client.memberSince || '2023'}
                        </span>
                    </div>
                    </div>
                )}
              </RoundedCard>
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  )
}
