import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiArrowLeft,
  FiMapPin,
  FiClock,
  FiUser,
} from 'react-icons/fi'
const mockJob = {
  id: '1',
  title: 'Build a sari-sari store inventory app',
  description: `Looking for an experienced mobile developer to build a simple inventory management app for my sari-sari store.

Requirements:
- Track products and quantities
- Record sales and expenses
- Generate simple reports
- Work offline and sync when connected
- Simple and easy to use interface

The app should be in Filipino/Taglish for easy understanding.`,
  budget: '₱15,000',
  budgetType: 'Fixed Price',
  deadline: 'March 30, 2024',
  posted: '1 hour ago',
  client: {
    name: 'Carlo Mendoza',
    location: 'Quezon City',
    memberSince: 'January 2023',
    jobsPosted: 5,
    totalSpent: '₱45,000',
  },
  skills: ['React Native', 'Firebase', 'Offline Storage', 'Mobile Development'],
  category: 'Web Development',
}
export function FreelancerJobDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bidAmount, setBidAmount] = useState('')
  const [deliveryTime, setDeliveryTime] = useState('')
  const [proposal, setProposal] = useState('')
  const handleSubmitBid = (e) => {
    e.preventDefault()
    // Mock submit
    navigate('/freelancer/dashboard')
  }
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            to="/freelancer/browse-jobs"
            className="inline-flex items-center font-poppins text-sm text-gray-600 hover:text-black mb-6"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-6">
              <RoundedCard className="p-6 lg:p-8">
                <h1 className="font-caveat text-3xl font-bold text-black mb-4">
                  {mockJob.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
                  <span className="flex items-center font-poppins text-sm">
                    <FiMapPin className="w-4 h-4 mr-1" />
                    {mockJob.client.location}
                  </span>
                  <span className="flex items-center font-poppins text-sm">
                    <FiClock className="w-4 h-4 mr-1" />
                    Posted {mockJob.posted}
                  </span>
                  <span className="px-3 py-1 bg-[#F8F8F8] rounded-[8px] font-poppins text-xs">
                    {mockJob.category}
                  </span>
                </div>

                <div className="prose max-w-none mb-6">
                  <p className="font-poppins text-gray-700 whitespace-pre-line leading-relaxed">
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

            {/* Client Info */}
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
                      {mockJob.client.name}
                    </p>
                    <p className="font-poppins text-xs text-gray-500">
                      {mockJob.client.location}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-[#EDEDED]">
                  <div className="flex justify-between">
                    <span className="font-poppins text-xs text-gray-500">
                      Member since
                    </span>
                    <span className="font-poppins text-xs text-black">
                      {mockJob.client.memberSince}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-poppins text-xs text-gray-500">
                      Jobs posted
                    </span>
                    <span className="font-poppins text-xs text-black">
                      {mockJob.client.jobsPosted}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-poppins text-xs text-gray-500">
                      Total spent
                    </span>
                    <span className="font-poppins text-xs text-black">
                      {mockJob.client.totalSpent}
                    </span>
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

export default FreelancerJobDetails;
