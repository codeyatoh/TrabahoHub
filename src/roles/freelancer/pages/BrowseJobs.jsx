import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { FiSearch, FiFilter, FiMapPin, FiClock } from 'react-icons/fi'
const categories = [
  'All',
  'Web Development',
  'Graphic Design',
  'Social Media',
  'Virtual Assistant',
  'Video Editing',
  'Writing',
]
const mockJobs = [
  {
    id: '1',
    title: 'Build a sari-sari store inventory app',
    description:
      'Need a simple mobile app to track inventory for my sari-sari store. Should work offline and sync when connected.',
    budget: '₱15,000',
    budgetType: 'Fixed',
    client: 'Carlo Mendoza',
    location: 'Quezon City',
    posted: '1 hour ago',
    skills: ['React Native', 'Firebase', 'Offline Storage'],
    category: 'Web Development',
  },
  {
    id: '2',
    title: 'TikTok video editor for food vlog',
    description:
      'Looking for someone to edit my food vlog videos. 2-3 videos per week, each around 1-2 minutes.',
    budget: '₱500/video',
    budgetType: 'Per Video',
    client: 'Rina Villanueva',
    location: 'Makati',
    posted: '3 hours ago',
    skills: ['Video Editing', 'CapCut', 'Premiere Pro'],
    category: 'Video Editing',
  },
  {
    id: '3',
    title: 'Virtual Assistant for online shop',
    description:
      'Need VA to handle customer inquiries, process orders, and manage social media. Part-time, flexible hours.',
    budget: '₱8,000/mo',
    budgetType: 'Monthly',
    client: 'Mark Torres',
    location: 'Cebu City',
    posted: '5 hours ago',
    skills: ['Customer Service', 'Excel', 'Social Media'],
    category: 'Virtual Assistant',
  },
  {
    id: '4',
    title: 'Logo design for milk tea shop',
    description:
      'New milk tea shop opening in Davao. Need a modern, minimalist logo that appeals to young customers.',
    budget: '₱3,500',
    budgetType: 'Fixed',
    client: 'Jenny Lim',
    location: 'Davao',
    posted: '8 hours ago',
    skills: ['Logo Design', 'Illustrator', 'Branding'],
    category: 'Graphic Design',
  },
  {
    id: '5',
    title: 'Social media manager for clothing brand',
    description:
      'Manage Instagram and Facebook accounts. Create content calendar, post daily, and engage with followers.',
    budget: '₱12,000/mo',
    budgetType: 'Monthly',
    client: 'Sofia Cruz',
    location: 'Manila',
    posted: '1 day ago',
    skills: ['Social Media', 'Content Creation', 'Canva'],
    category: 'Social Media',
  },
]
export function BrowseJobs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || job.category === selectedCategory
    return matchesSearch && matchesCategory
  })
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Browse Jobs
            </h1>
            <p className="font-poppins text-gray-600">
              Find your next project from Filipino clients
            </p>
          </div>

          {/* Search & Filter */}
          <RoundedCard className="p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jobs..."
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-[10px] font-poppins text-sm whitespace-nowrap transition-colors ${selectedCategory === category ? 'bg-black text-white' : 'bg-[#F8F8F8] text-gray-600 hover:bg-[#EDEDED]'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </RoundedCard>

          {/* Results Count */}
          <p className="font-poppins text-sm text-gray-600 mb-4">
            {filteredJobs.length} jobs found
          </p>

          {/* Jobs List */}
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <RoundedCard key={job.id} hover className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0 lg:pr-8">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-caveat text-xl font-semibold text-black">
                        {job.title}
                      </h3>
                    </div>
                    <p className="font-poppins text-sm text-gray-600 mb-3 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-3">
                      <span className="flex items-center font-poppins text-xs">
                        <FiMapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </span>
                      <span className="flex items-center font-poppins text-xs">
                        <FiClock className="w-4 h-4 mr-1" />
                        {job.posted}
                      </span>
                      <span className="font-poppins text-xs">
                        by {job.client}
                      </span>
                    </div>
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
                  <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4">
                    <div className="text-left lg:text-right">
                      <p className="font-caveat text-2xl font-bold text-black">
                        {job.budget}
                      </p>
                      <p className="font-poppins text-xs text-gray-500">
                        {job.budgetType}
                      </p>
                    </div>
                    <Link
                      to={`/freelancer/job/${job.id}`}
                      className="px-6 py-2 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                    >
                      View & Apply
                    </Link>
                  </div>
                </div>
              </RoundedCard>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <RoundedCard className="p-12 text-center">
              <p className="font-poppins text-gray-500">
                No jobs found matching your criteria
              </p>
            </RoundedCard>
          )}
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  )
}

export default BrowseJobs;
