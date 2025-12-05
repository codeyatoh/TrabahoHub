import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiDollarSign,
  FiCheckCircle,
  FiStar,
  FiTrendingUp,
  FiArrowRight,
} from 'react-icons/fi'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
const stats = [
  {
    icon: FiDollarSign,
    label: 'Earned This Month',
    value: '₱12,500',
    trend: '+15%',
  },
  {
    icon: FiCheckCircle,
    label: 'Jobs Completed',
    value: '24',
    trend: '+3',
  },
  {
    icon: FiStar,
    label: 'Rating',
    value: '4.9',
    trend: 'Top Rated',
  },
  {
    icon: FiTrendingUp,
    label: 'Success Rate',
    value: '98%',
    trend: 'Excellent',
  },
]
// Earnings trend data - totals to approximately ₱45,750
const earningsData = [
  {
    month: 'Sep',
    amount: 6500,
  },
  {
    month: 'Oct',
    amount: 8250,
  },
  {
    month: 'Nov',
    amount: 5500,
  },
  {
    month: 'Dec',
    amount: 7000,
  },
  {
    month: 'Jan',
    amount: 6000,
  },
  {
    month: 'Feb',
    amount: 12500,
  },
]
// Jobs by category data - totals to 24 completed jobs
const categoryData = [
  {
    category: 'Web Dev',
    jobs: 10,
    color: '#000000',
  },
  {
    category: 'Mobile',
    jobs: 5,
    color: '#374151',
  },
  {
    category: 'Design',
    jobs: 4,
    color: '#6B7280',
  },
  {
    category: 'VA',
    jobs: 3,
    color: '#9CA3AF',
  },
  {
    category: 'Other',
    jobs: 2,
    color: '#D1D5DB',
  },
]
const availableJobs = [
  {
    id: '1',
    title: 'Build a sari-sari store inventory app',
    budget: '₱15,000',
    client: 'Carlo M.',
    location: 'Quezon City',
    posted: '1 hour ago',
    skills: ['React Native', 'Firebase'],
  },
  {
    id: '2',
    title: 'TikTok video editor for food vlog',
    budget: '₱500/video',
    client: 'Rina V.',
    location: 'Makati',
    posted: '3 hours ago',
    skills: ['Video Editing', 'CapCut'],
  },
  {
    id: '3',
    title: 'Virtual Assistant for online shop',
    budget: '₱8,000/mo',
    client: 'Mark T.',
    location: 'Cebu',
    posted: '5 hours ago',
    skills: ['Customer Service', 'Excel'],
  },
]
const formatCurrency = (value) => `₱${value.toLocaleString()}`
import angelitoImg from '../../../assets/images/Angelito-Halmain.jpg'

// ... existing imports ...

export function FreelancerDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center space-x-4">
            <img
              src={angelitoImg}
              alt="Angelito Halmain"
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h1 className="font-caveat text-4xl font-bold text-black mb-1">
                Kumusta, Angelito!
              </h1>
              <p className="font-poppins text-gray-600">
                Here's your freelancing overview
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <RoundedCard key={stat.label} className="p-4 lg:p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-[#F8F8F8] rounded-[10px] flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-black" />
                  </div>
                  <span className="font-poppins text-xs text-green-600 bg-green-50 px-2 py-1 rounded-[6px]">
                    {stat.trend}
                  </span>
                </div>
                <p className="font-caveat text-2xl lg:text-3xl font-bold text-black">
                  {stat.value}
                </p>
                <p className="font-poppins text-xs text-gray-500">
                  {stat.label}
                </p>
              </RoundedCard>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Earnings Trend Chart */}
            <RoundedCard className="p-6">
              <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                Earnings Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDEDED" />
                  <XAxis
                    dataKey="month"
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Poppins',
                    }}
                    stroke="#9CA3AF"
                  />
                  <YAxis
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Poppins',
                    }}
                    stroke="#9CA3AF"
                    tickFormatter={(value) => `₱${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      formatCurrency(value),
                      'Earned',
                    ]}
                    contentStyle={{
                      borderRadius: '10px',
                      border: '1px solid #EDEDED',
                      fontFamily: 'Poppins',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#000000"
                    fill="#000000"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </RoundedCard>

            {/* Jobs by Category Chart */}
            <RoundedCard className="p-6">
              <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                Jobs by Category
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#EDEDED"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Poppins',
                    }}
                    stroke="#9CA3AF"
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{
                      fontSize: 12,
                      fontFamily: 'Poppins',
                    }}
                    stroke="#9CA3AF"
                    width={60}
                  />
                  <Tooltip
                    formatter={(value) => [value, 'Jobs']}
                    contentStyle={{
                      borderRadius: '10px',
                      border: '1px solid #EDEDED',
                      fontFamily: 'Poppins',
                    }}
                  />
                  <Bar dataKey="jobs" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </RoundedCard>
          </div>

          {/* Earnings Card */}
          <RoundedCard className="p-6 lg:p-8 mb-8 bg-black text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="font-poppins text-sm text-gray-400 mb-1">
                  Total Earnings
                </p>
                <p className="font-caveat text-5xl lg:text-6xl font-bold">
                  ₱45,750
                </p>
                <p className="font-poppins text-sm text-gray-400 mt-2">
                  Since joining TrabahoHub
                </p>
              </div>
              <div className="mt-6 lg:mt-0">
                <Link
                  to="/freelancer/browse-jobs"
                  className="inline-flex items-center px-6 py-3 bg-white text-black font-poppins text-sm rounded-[10px] hover:bg-gray-100 transition-colors"
                >
                  Find More Jobs
                  <FiArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </RoundedCard>

          {/* Available Jobs */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-caveat text-2xl font-bold text-black">
                Jobs For You
              </h2>
              <Link
                to="/freelancer/browse-jobs"
                className="font-poppins text-sm text-gray-600 hover:text-black flex items-center"
              >
                View All
                <FiArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {availableJobs.map((job) => (
                <RoundedCard key={job.id} hover className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                    <div className="mb-4 sm:mb-0">
                      <h3 className="font-poppins text-sm font-medium text-black mb-1">
                        {job.title}
                      </h3>
                      <p className="font-poppins text-xs text-gray-500">
                        {job.client} • {job.location} • {job.posted}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-[#F8F8F8] rounded-[6px] font-poppins text-xs text-gray-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-caveat text-xl font-bold text-black">
                        {job.budget}
                      </span>
                      <Link
                        to={`/freelancer/job/${job.id}`}
                        className="px-4 py-2 bg-black text-white font-poppins text-xs rounded-[8px] hover:bg-gray-800 transition-colors"
                      >
                        Apply
                      </Link>
                    </div>
                  </div>
                </RoundedCard>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  )
}

export default FreelancerDashboard;
