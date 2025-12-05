import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { EscrowStatus } from '../../../shared/components/EscrowStatus'
import { ReviewModal } from '../../../shared/components/ReviewModal'
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal'
import { showToast } from '../../../shared/components/Toast'
import { Select } from '../../../shared/components/Select'
import {
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiStar,
  FiMessageSquare,
  FiTrendingDown,
  FiClock,
  FiAward,
} from 'react-icons/fi'
const mockJob = {
  id: '1',
  title: 'E-commerce Website Development',
  description:
    'Looking for an experienced web developer to build a complete e-commerce website for my online clothing store. The website should have product listings, shopping cart, checkout with payment integration (GCash, Maya), and admin dashboard for inventory management.',
  budget: '₱25,000',
  budgetType: 'Fixed',
  deadline: 'March 15, 2024',
  posted: '2 days ago',
  category: 'Web Development',
  skills: ['React', 'Node.js', 'MongoDB', 'Payment Integration'],
  status: 'Active',
  escrowStatus: 'not-funded',
}
const mockBids = [
  {
    id: '1',
    freelancer: 'Maria Santos',
    location: 'Cebu City',
    rating: 4.9,
    completedJobs: 52,
    amount: '₱22,000',
    duration: '2 weeks',
    proposal:
      "I have 5 years of experience building e-commerce websites. I can deliver a fully functional site with GCash and Maya integration. I've completed similar projects for 3 local businesses.",
  },
  {
    id: '2',
    freelancer: 'Juan Reyes',
    location: 'Manila',
    rating: 5.0,
    completedJobs: 87,
    amount: '₱25,000',
    duration: '10 days',
    proposal:
      "Expert in React and Node.js. I've built similar projects for local businesses. Can start immediately and deliver high-quality code with documentation.",
  },
  {
    id: '3',
    freelancer: 'Ana Garcia',
    location: 'Davao',
    rating: 4.8,
    completedJobs: 34,
    amount: '₱20,000',
    duration: '3 weeks',
    proposal:
      'Full-stack developer with experience in payment integrations. Portfolio available upon request. I focus on clean code and user-friendly interfaces.',
  },
]
export function JobDetails() {
  const { id } = useParams()
  const [sortBy, setSortBy] = useState('lowest')
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showFundConfirm, setShowFundConfirm] = useState(false)
  const [showAcceptConfirm, setShowAcceptConfirm] = useState(false)
  const [showCloseJobConfirm, setShowCloseJobConfirm] = useState(false)
  const [selectedFreelancer, setSelectedFreelancer] = useState('')
  const [escrowStatus, setEscrowStatus] = useState(mockJob.escrowStatus)
  const [isLoading, setIsLoading] = useState(false)
  const sortOptions = [
    {
      value: 'lowest',
      label: 'Lowest Bid',
    },
    {
      value: 'highest-rating',
      label: 'Highest Rating',
    },
    {
      value: 'fastest',
      label: 'Fastest Delivery',
    },
  ]
  const sortedBids = [...mockBids].sort((a, b) => {
    switch (sortBy) {
      case 'lowest':
        return (
          parseFloat(a.amount.replace('₱', '').replace(',', '')) -
          parseFloat(b.amount.replace('₱', '').replace(',', ''))
        )
      case 'highest-rating':
        return b.rating - a.rating
      case 'fastest':
        const getDays = (duration) => {
          if (duration.includes('week')) {
            return parseInt(duration) * 7
          }
          return parseInt(duration)
        }
        return getDays(a.duration) - getDays(b.duration)
      default:
        return 0
    }
  })
  const handleFundProject = () => {
    setIsLoading(true)
    setTimeout(() => {
      setEscrowStatus('funded')
      setShowFundConfirm(false)
      setIsLoading(false)
      showToast.success(
        'Project funded successfully! Payment is now in escrow.',
      )
    }, 1500)
  }
  const handleAcceptBid = (freelancerName) => {
    setSelectedFreelancer(freelancerName)
    if (escrowStatus === 'not-funded') {
      showToast.warning('Please fund the project before hiring a freelancer')
      setShowFundConfirm(true)
    } else {
      setShowAcceptConfirm(true)
    }
  }
  const confirmAcceptBid = () => {
    setIsLoading(true)
    setTimeout(() => {
      setShowAcceptConfirm(false)
      setIsLoading(false)
      showToast.success(
        `Bid accepted! ${selectedFreelancer} has been hired for this project.`,
      )
    }, 1500)
  }
  const handleCloseJob = () => {
    setShowCloseJobConfirm(true)
  }
  const confirmCloseJob = () => {
    setIsLoading(true)
    setTimeout(() => {
      setShowCloseJobConfirm(false)
      setIsLoading(false)
      showToast.success('Job closed successfully')
    }, 1500)
  }
  const handleSubmitReview = (rating, review) => {
    showToast.success('Thank you for your review!')
  }
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            to="/client/dashboard"
            className="inline-flex items-center font-poppins text-sm text-gray-600 hover:text-black mb-6"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-6">
              <RoundedCard className="p-6 lg:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="font-caveat text-3xl font-bold text-black mb-2">
                      {mockJob.title}
                    </h1>
                    <p className="font-poppins text-sm text-gray-500">
                      Posted {mockJob.posted} • {mockJob.category}
                    </p>
                  </div>
                  <span className="px-4 py-2 bg-black text-white rounded-[8px] font-poppins text-sm">
                    {mockJob.status}
                  </span>
                </div>

                <div className="prose max-w-none mb-6">
                  <p className="font-poppins text-gray-700 leading-relaxed">
                    {mockJob.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {mockJob.skills.map((skill) => (
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
                      {mockJob.budget}
                    </p>
                    <p className="font-poppins text-xs text-gray-500">
                      {mockJob.budgetType}
                    </p>
                  </div>
                  <div>
                    <p className="font-poppins text-xs text-gray-500 mb-1">
                      Deadline
                    </p>
                    <p className="font-poppins text-sm font-medium text-black">
                      {mockJob.deadline}
                    </p>
                  </div>
                  <div>
                    <p className="font-poppins text-xs text-gray-500 mb-1">
                      Bids
                    </p>
                    <p className="font-caveat text-xl font-bold text-black">
                      {mockBids.length}
                    </p>
                  </div>
                </div>
              </RoundedCard>

              {/* Escrow Status */}
              <EscrowStatus
                status={escrowStatus}
                amount={mockJob.budget}
                onFund={() => setShowFundConfirm(true)}
                showActions={true}
              />
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <RoundedCard className="p-6">
                <h3 className="font-caveat text-xl font-bold text-black mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors">
                    Edit Job
                  </button>
                  <button
                    onClick={handleCloseJob}
                    className="w-full py-3 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
                  >
                    Close Job
                  </button>
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="w-full py-3 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
                  >
                    Leave Review
                  </button>
                </div>
              </RoundedCard>
            </div>
          </div>

          {/* Bids Section */}
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="font-caveat text-2xl font-bold text-black mb-4 sm:mb-0">
                Received Bids ({mockBids.length})
              </h2>

              {/* Sort Options */}
              <div className="flex items-center space-x-2">
                <span className="font-poppins text-sm text-gray-600">
                  Sort by:
                </span>
                <Select
                  value={sortBy}
                  onChange={(value) =>
                    setSortBy(value)
                  }
                  options={sortOptions}
                  className="w-48"
                />
              </div>
            </div>

            <div className="space-y-4">
              {sortedBids.map((bid, index) => (
                <RoundedCard
                  key={bid.id}
                  className={`p-6 ${index === 0 && sortBy === 'lowest' ? 'border-2 border-green-500' : ''}`}
                >
                  {index === 0 && sortBy === 'lowest' && (
                    <div className="mb-4 flex items-center space-x-2">
                      <FiTrendingDown className="w-4 h-4 text-green-600" />
                      <span className="font-poppins text-xs font-medium text-green-600">
                        LOWEST BID
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                      <div className="w-12 h-12 bg-[#F8F8F8] rounded-full flex items-center justify-center font-caveat text-xl">
                        {bid.freelancer.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-caveat text-xl font-semibold text-black">
                          {bid.freelancer}
                        </h3>
                        <p className="font-poppins text-sm text-gray-500">
                          {bid.location}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center">
                            <FiStar className="w-4 h-4 text-black fill-current" />
                            <span className="font-poppins text-sm text-black ml-1">
                              {bid.rating}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500">
                            <FiAward className="w-4 h-4 mr-1" />
                            <span className="font-poppins text-xs">
                              {bid.completedJobs} jobs
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-caveat text-2xl font-bold text-black">
                        {bid.amount}
                      </p>
                      <div className="flex items-center justify-end text-gray-500 mt-1">
                        <FiClock className="w-3 h-3 mr-1" />
                        <p className="font-poppins text-xs">{bid.duration}</p>
                      </div>
                    </div>
                  </div>
                  <p className="font-poppins text-sm text-gray-700 mt-4 mb-4">
                    {bid.proposal}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => handleAcceptBid(bid.freelancer)}
                      className="flex-1 py-2 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                    >
                      Accept Bid & Hire
                    </button>
                    <button className="flex-1 py-2 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors flex items-center justify-center">
                      <FiMessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </button>
                  </div>
                </RoundedCard>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="client" />

      {/* Review Modal */}
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleSubmitReview}
        recipientName={selectedFreelancer || 'Freelancer'}
        recipientRole="freelancer"
      />

      {/* Fund Project Confirmation */}
      <ConfirmationModal
        isOpen={showFundConfirm}
        onClose={() => setShowFundConfirm(false)}
        onConfirm={handleFundProject}
        title="Fund Project"
        message={`Are you sure you want to fund this project with ${mockJob.budget}? The payment will be held in escrow until you approve the work.`}
        confirmText="Fund Project"
        type="info"
        isLoading={isLoading}
      />

      {/* Accept Bid Confirmation */}
      <ConfirmationModal
        isOpen={showAcceptConfirm}
        onClose={() => setShowAcceptConfirm(false)}
        onConfirm={confirmAcceptBid}
        title="Accept Bid"
        message={`Are you sure you want to hire ${selectedFreelancer} for this project? This will close the job to other bidders.`}
        confirmText="Accept & Hire"
        type="info"
        isLoading={isLoading}
      />

      {/* Close Job Confirmation */}
      <ConfirmationModal
        isOpen={showCloseJobConfirm}
        onClose={() => setShowCloseJobConfirm(false)}
        onConfirm={confirmCloseJob}
        title="Close Job"
        message="Are you sure you want to close this job? This will reject all pending bids and the job will no longer be visible to freelancers."
        confirmText="Close Job"
        type="warning"
        isLoading={isLoading}
      />
    </div>
  )
}

export default JobDetails;
