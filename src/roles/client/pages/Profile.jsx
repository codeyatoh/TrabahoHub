import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiEdit2,
  FiMapPin,
  FiCalendar,
  FiCheckCircle,
  FiAward,
  FiZap,
  FiDollarSign,
  FiBriefcase,
  FiClock,
  FiX,
  FiUserCheck,
  FiMessageCircle,
  FiRepeat,
  FiShield,
} from 'react-icons/fi'
import aivyImg from '../../../assets/images/Aivy-Gonzales.jpg'

const initialProfile = {
  name: 'Aivy Gonzales',
  role: 'Client',
  location: 'Manila',
  memberSince: 'January 2023',
  jobsPosted: 12,
  totalSpent: '₱145,000',
  activeProjects: 3,
  successRate: '95%',
  bio: 'We are a growing digital agency looking for talented freelancers to help us scale our operations. We value clear communication and quality work.',
}
const badges = [
  {
    icon: FiUserCheck,
    label: 'Verified Client',
    description: 'Identity verified',
    unlocked: true,
  },
  {
    icon: FiZap,
    label: 'Quick Payer',
    description: 'Pays within 24 hours',
    unlocked: true,
  },
  {
    icon: FiRepeat,
    label: 'Repeat Hirer',
    description: 'Hired 5+ freelancers',
    unlocked: true,
  },
  {
    icon: FiMessageCircle,
    label: 'Clear Communicator',
    description: 'High response rate',
    unlocked: true,
  },
  {
    icon: FiDollarSign,
    label: 'Fair Budget',
    description: 'Competitive rates',
    unlocked: false,
  },
  {
    icon: FiShield,
    label: 'Long-term Partner',
    description: '6+ month projects',
    unlocked: false,
  },
]
const recentProjects = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    freelancer: 'Maria Santos',
    budget: '₱25,000',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Logo Design for Coffee Shop',
    freelancer: 'Juan Reyes',
    budget: '₱5,000',
    status: 'Completed',
  },
  {
    id: '3',
    title: 'Social Media Management',
    freelancer: 'Ana Garcia',
    budget: '₱15,000/mo',
    status: 'Active',
  },
]
export function ClientProfile() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [profile, setProfile] = useState(initialProfile)
  const [editForm, setEditForm] = useState(initialProfile)
  const handleEditClick = () => {
    setEditForm(profile)
    setIsEditModalOpen(true)
  }
  const handleSave = (e) => {
    e.preventDefault()
    setProfile(editForm)
    setIsEditModalOpen(false)
  }
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <RoundedCard className="p-6 lg:p-8 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={aivyImg}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border border-[#EDEDED]"
                />
                <div>
                  <h1 className="font-caveat text-3xl font-bold text-black mb-1">
                    {profile.name}
                  </h1>
                  <p className="font-poppins text-gray-600 mb-2">
                    {profile.role}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500">
                    <span className="flex items-center font-poppins text-sm">
                      <FiMapPin className="w-4 h-4 mr-1" />
                      {profile.location}
                    </span>
                    <span className="flex items-center font-poppins text-sm">
                      <FiCalendar className="w-4 h-4 mr-1" />
                      Member since {profile.memberSince}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEditClick}
                className="mt-4 lg:mt-0 inline-flex items-center px-4 py-2 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
              >
                <FiEdit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#EDEDED]">
              <div className="text-center">
                <p className="font-caveat text-3xl font-bold text-black">
                  {profile.jobsPosted}
                </p>
                <p className="font-poppins text-xs text-gray-500">
                  Jobs Posted
                </p>
              </div>
              <div className="text-center">
                <p className="font-caveat text-3xl font-bold text-black">
                  {profile.totalSpent}
                </p>
                <p className="font-poppins text-xs text-gray-500">
                  Total Spent
                </p>
              </div>
              <div className="text-center">
                <p className="font-caveat text-3xl font-bold text-black">
                  {profile.activeProjects}
                </p>
                <p className="font-poppins text-xs text-gray-500">
                  Active Projects
                </p>
              </div>
              <div className="text-center">
                <p className="font-caveat text-3xl font-bold text-black">
                  {profile.successRate}
                </p>
                <p className="font-poppins text-xs text-gray-500">
                  Success Rate
                </p>
              </div>
            </div>
          </RoundedCard>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <RoundedCard className="p-6">
                <h2 className="font-caveat text-2xl font-bold text-black mb-4">
                  About
                </h2>
                <p className="font-poppins text-gray-700 leading-relaxed">
                  {profile.bio}
                </p>
              </RoundedCard>

              {/* Recent Projects */}
              <RoundedCard className="p-6">
                <h2 className="font-caveat text-2xl font-bold text-black mb-4">
                  Recent Projects
                </h2>
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 bg-[#F8F8F8] rounded-[10px] flex flex-col sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="mb-2 sm:mb-0">
                        <h3 className="font-poppins text-sm font-medium text-black">
                          {project.title}
                        </h3>
                        <p className="font-poppins text-xs text-gray-500">
                          Freelancer: {project.freelancer}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-caveat text-lg font-bold text-black">
                          {project.budget}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-[8px] font-poppins text-xs ${project.status === 'Active' ? 'bg-black text-white' : 'bg-[#EDEDED] text-gray-700'}`}
                        >
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </RoundedCard>
            </div>

            {/* Right Column - Badges */}
            <div className="lg:col-span-1">
              <RoundedCard className="p-6">
                <h2 className="font-caveat text-2xl font-bold text-black mb-4">
                  Badges
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {badges.map((badge) => (
                    <div
                      key={badge.label}
                      className={`p-3 rounded-[12px] text-center transition-all ${badge.unlocked ? 'bg-black text-white' : 'bg-white border border-[#EDEDED] text-gray-400'}`}
                    >
                      <badge.icon
                        className={`w-6 h-6 mx-auto mb-2 ${badge.unlocked ? 'text-white' : 'text-gray-300'}`}
                      />
                      <p
                        className={`font-caveat text-base font-semibold leading-tight ${badge.unlocked ? 'text-white' : 'text-gray-400'}`}
                      >
                        {badge.label}
                      </p>
                      <p
                        className={`font-poppins text-[10px] mt-1 ${badge.unlocked ? 'text-gray-300' : 'text-gray-400'}`}
                      >
                        {badge.description}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-center font-poppins text-sm text-gray-600 hover:text-black transition-colors border border-[#EDEDED] rounded-[8px] hover:bg-[#F8F8F8]">
                  View All Badges
                </button>
              </RoundedCard>
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="client" />

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <RoundedCard className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-caveat text-2xl font-bold text-black">
                  Edit Profile
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-[#F8F8F8] rounded-full"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block font-poppins text-sm font-medium text-black mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-[#F8F8F8] border border-[#EDEDED] rounded-[8px] font-poppins text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-black mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        location: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-[#F8F8F8] border border-[#EDEDED] rounded-[8px] font-poppins text-sm focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block font-poppins text-sm font-medium text-black mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    value={editForm.bio}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        bio: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 bg-[#F8F8F8] border border-[#EDEDED] rounded-[8px] font-poppins text-sm focus:outline-none focus:border-black resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="flex-1 py-2 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[8px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-black text-white font-poppins text-sm rounded-[8px] hover:bg-gray-800 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </RoundedCard>
        </div>
      )}
    </div>
  )
}

export default ClientProfile;
