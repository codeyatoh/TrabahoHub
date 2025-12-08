import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { useUser } from '../../../context/UserContext'
import { getJobsByClientId, getClientStats } from '../../../services/mockData'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiBriefcase,
  FiDollarSign,
  FiMessageSquare,
  FiPlus,
  FiArrowRight,
} from 'react-icons/fi'
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { PostJobModal } from '../../../shared/components/PostJobModal'
import aivyImg from '../../../assets/images/Aivy-Gonzales.jpg'

// Spending trend data - totals to approximately ₱45,500 (Keep static for demo)
const spendingData = [
  {
    month: 'Sep',
    amount: 5000,
  },
  {
    month: 'Oct',
    amount: 8500,
  },
  {
    month: 'Nov',
    amount: 6000,
  },
  {
    month: 'Dec',
    amount: 12000,
  },
  {
    month: 'Jan',
    amount: 7500,
  },
  {
    month: 'Feb',
    amount: 6500,
  },
]

// Project Tracking Data
const projectActivityData = [
  { month: 'Sep', projects: 2 },
  { month: 'Oct', projects: 4 },
  { month: 'Nov', projects: 3 },
  { month: 'Dec', projects: 6 },
  { month: 'Jan', projects: 4 },
  { month: 'Feb', projects: 5 },
]

// Jobs status data - 3 active, rest completed/cancelled
const jobsStatusData = [
  {
    name: 'Active',
    value: 3,
    color: '#000000',
  },
  {
    name: 'Completed',
    value: 8,
    color: '#4B5563',
  },
  {
    name: 'Cancelled',
    value: 1,
    color: '#D1D5DB',
  },
]
const formatCurrency = (value) => `₱${value.toLocaleString()}`

// Calculate progress based on approved milestones
const calculateProgress = (job) => {
  if (!job.milestones || job.milestones.length === 0) return 0
  const approvedMilestones = job.milestones.filter((m) => m.status === 'approved')
  return Math.round((approvedMilestones.length / job.milestones.length) * 100)
}

export function ClientDashboard() {
  const { currentUser } = useUser()
  const [isPostJobModalOpen, setIsPostJobModalOpen] = React.useState(false) // State for modal
  
  // Get Real Stats
  const clientStats = getClientStats(currentUser?.id || 'client-1')
  const stats = [
    {
      icon: FiBriefcase,
      label: 'Active Jobs',
      value: clientStats.activeJobs,
      color: 'bg-black',
    },
    {
      icon: FiDollarSign,
      label: 'Total Spent',
      value: clientStats.totalSpent,
      color: 'bg-[#F8F8F8]',
    },
    {
      icon: FiMessageSquare,
      label: 'Messages',
      value: clientStats.messages,
      color: 'bg-[#F8F8F8]',
    },
  ]

  // Get Active Jobs for Progress Tracking
  const allJobs = getJobsByClientId(currentUser?.id || 'client-1')
  const activeJobs = allJobs.filter(job => job.status === 'active' || job.status === 'in-progress')
  
  const projectProgressData = activeJobs.slice(0, 5).map(job => ({
    name: job.title.length > 20 ? job.title.substring(0, 15) + '...' : job.title,
    progress: calculateProgress(job),
    fullTitle: job.title
  }))

  // Derived Jobs Status Data
  const jobsStatusData = [
    {
      name: 'Active',
      value: allJobs.filter(j => j.status === 'active' || j.status === 'in-progress').length,
      color: '#000000',
    },
    {
      name: 'Completed',
      value: allJobs.filter(j => j.status === 'completed').length,
      color: '#4B5563',
    },
    {
      name: 'Cancelled',
      value: allJobs.filter(j => j.status === 'cancelled').length,
      color: '#D1D5DB',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={currentUser?.image || aivyImg}
                alt={currentUser?.name || "Client"}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h1 className="font-caveat text-4xl font-bold text-black mb-1">
                  Magandang Araw, {currentUser?.name?.split(' ')[0] || 'Client'}!
                </h1>
                <p className="font-poppins text-gray-600">
                  Here's what's happening with your projects
                </p>
              </div>
            </div>
            <button
               onClick={() => setIsPostJobModalOpen(true)}
               className="mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Post New Job
            </button>
          </div>

          <PostJobModal 
            isOpen={isPostJobModalOpen} 
            onClose={() => setIsPostJobModalOpen(false)} 
          />
          
          {/* Stats Grid */}

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {stats.map((stat) => (
              <RoundedCard key={stat.label} className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-[10px] flex items-center justify-center`}
                  >
                    <stat.icon
                      className={`w-6 h-6 ${stat.color === 'bg-black' ? 'text-white' : 'text-black'}`}
                    />
                  </div>
                  <div>
                    <p className="font-poppins text-sm text-gray-600">
                      {stat.label}
                    </p>
                    <p className="font-caveat text-2xl font-bold text-black">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </RoundedCard>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Spending Trend Chart */}
            <RoundedCard className="p-6">
              <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                Spending Trend
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={spendingData}>
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
                      'Spent',
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

            {/* Jobs Status Chart */}
            <RoundedCard className="p-6">
              <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                Jobs Overview
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={jobsStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{
                      stroke: '#9CA3AF',
                    }}
                  >
                    {jobsStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [value, name]}
                    contentStyle={{
                      borderRadius: '10px',
                      border: '1px solid #EDEDED',
                      fontFamily: 'Poppins',
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      fontFamily: 'Poppins',
                      fontSize: '12px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </RoundedCard>
          </div>

          {/* Active Projects Progress Chart */}
          <RoundedCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-caveat text-2xl font-bold text-black">
                Active Projects Progress
              </h2>
              <Link
                to="/client/projects"
                className="font-poppins text-sm text-gray-600 hover:text-black flex items-center"
              >
                View All
                <FiArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectProgressData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EDEDED" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{
                    fontSize: 12,
                    fontFamily: 'Poppins',
                  }}
                  stroke="#9CA3AF"
                  unit="%"
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{
                    fontSize: 11,
                    fontFamily: 'Poppins',
                  }}
                  stroke="#9CA3AF"
                  width={150}
                />
                <Tooltip
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #EDEDED',
                    fontFamily: 'Poppins',
                  }}
                  formatter={(value) => [`${value}%`, 'Progress']}
                  labelFormatter={(name, props) => {
                    const payload = props[0]?.payload;
                    return payload ? payload.fullTitle : name;
                  }}
                />
                <Bar 
                  dataKey="progress" 
                  fill="#000000" 
                  radius={[0, 4, 4, 0]}
                  name="Progress" 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </RoundedCard>
        </div>
      </main>

      <BottomNav role="client" />
    </div>
  )
}

export default ClientDashboard
