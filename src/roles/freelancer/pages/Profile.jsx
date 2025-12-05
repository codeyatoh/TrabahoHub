import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiEdit2,
  FiStar,
  FiMapPin,
  FiCalendar,
  FiZap,
  FiCheckCircle,
  FiTarget,
  FiClock,
  FiThumbsUp,
  FiX,
} from 'react-icons/fi'
import angelitoImg from '../../../assets/images/Angelito-Halmain.jpg'

const initialProfile = {
  name: 'Angelito Halmain',
  title: 'Full-Stack Developer',
  location: 'Cebu City',
  memberSince: 'June 2022',
  rate: '₱500/hr',
  rating: 4.9,
  reviews: 47,
  completedJobs: 52,
  bio: 'Experienced full-stack developer specializing in React, Node.js, and mobile development. I help Filipino businesses build their digital presence with modern, user-friendly applications.',
  skills: [
    'React',
    'Node.js',
    'TypeScript',
    'React Native',
    'Firebase',
    'MongoDB',
    'Figma',
    'UI/UX',
  ],
  portfolio: [
    {
      id: '1',
      title: 'E-commerce Platform',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
    },
    {
      id: '2',
      title: 'Food Delivery App',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    },
    {
      id: '3',
      title: 'Inventory System',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    },
  ],
}
const badges = [
  {
    icon: FiStar,
    label: 'Excellence',
    description: 'Top-rated freelancer',
    unlocked: true,
  },
  {
    icon: FiZap,
    label: 'Bilis Mag-Reply',
    description: 'Responds within 1 hour',
    unlocked: true,
  },
  {
    icon: FiCheckCircle,
    label: 'Completed',
    description: '50+ jobs completed',
    unlocked: true,
  },
  {
    icon: FiTarget,
    label: 'Client Favorite',
    description: 'High rehire rate',
    unlocked: false,
  },
  {
    icon: FiClock,
    label: 'Fast Delivery',
    description: 'Delivers on time',
    unlocked: true,
  },
  {
    icon: FiThumbsUp,
    label: 'Quality Work',
    description: 'High satisfaction rate',
    unlocked: true,
  },
]
export function FreelancerProfile() {
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
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Profile Header */}
          <RoundedCard className="p-6 lg:p-8 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                  src={angelitoImg}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover border border-[#EDEDED]"
                />
                <div>
                  <h1 className="font-caveat text-3xl font-bold text-black mb-1">
                    {profile.name}
                  </h1>
                  <p className="font-poppins text-gray-600 mb-2">
                    {profile.title}
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
                  {profile.rate}
                </p>
                <p className="font-poppins text-xs text-gray-500">
                  Hourly Rate
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center">
                  <FiStar className="w-5 h-5 text-black fill-current mr-1" />
                  <span className="font-caveat text-3xl font-bold text-black">
                    {profile.rating}
                  </span>
                </div>
                <p className="font-poppins text-xs text-gray-500">
                  {profile.reviews} reviews
                </p>
              </div>
              <div className="text-center">
                <p className="font-caveat text-3xl font-bold text-black">
                  {profile.completedJobs}
                </p>
                <p className="font-poppins text-xs text-gray-500">
                  Jobs Completed
                </p>
              </div>
              <div className="text-center">
                <p className="font-caveat text-3xl font-bold text-black">98%</p>
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

              {/* Skills */}
              <RoundedCard className="p-6">
                <h2 className="font-caveat text-2xl font-bold text-black mb-4">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-[#F8F8F8] rounded-[10px] font-poppins text-sm text-gray-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </RoundedCard>

              {/* Portfolio */}
              <RoundedCard className="p-6">
                <h2 className="font-caveat text-2xl font-bold text-black mb-4">
                  Portfolio
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {profile.portfolio.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-video rounded-[12px] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="font-poppins text-white text-sm">
                          {item.title}
                        </p>
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

      <BottomNav role="freelancer" />

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
                    Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        title: e.target.value,
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
                    Hourly Rate
                  </label>
                  <input
                    type="text"
                    value={editForm.rate}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        rate: e.target.value,
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

export default FreelancerProfile;
