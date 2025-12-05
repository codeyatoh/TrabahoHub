import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
const stats = [
  {
    icon: FiBriefcase,
    label: 'Active Jobs',
    value: '3',
    color: 'bg-black',
  },
  {
    icon: FiDollarSign,
    label: 'Total Spent',
    value: '₱45,500',
    color: 'bg-[#F8F8F8]',
  },
  {
    icon: FiMessageSquare,
    label: 'Messages',
    value: '12',
    color: 'bg-[#F8F8F8]',
  },
]
// Spending trend data - totals to approximately ₱45,500
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
const recentJobs = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    budget: '₱25,000',
    bids: 8,
    status: 'Active',
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'Logo Design for Coffee Shop',
    budget: '₱5,000',
    bids: 15,
    status: 'Active',
    posted: '5 days ago',
  },
  {
    id: '3',
    title: 'Social Media Management',
    budget: '₱15,000/mo',
    bids: 6,
    status: 'In Progress',
    posted: '1 week ago',
  },
]
const formatCurrency = (value) => `₱${value.toLocaleString()}`
import aivyImg from '../../../assets/images/Aivy-Gonzales.jpg'

// ... existing imports ...

export function ClientDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center space-x-4">
              <img
                src={aivyImg}
                alt="Aivy Gonzales"
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h1 className="font-caveat text-4xl font-bold text-black mb-1">
                  Magandang Araw, Aivy!
                </h1>
                <p className="font-poppins text-gray-600">
                  Here's what's happening with your projects
                </p>
              </div>
            </div>
            <Link
              to="/client/post-job"
              className="mt-4 sm:mt-0 inline-flex items-center justify-center px-6 py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
            >
              <FiPlus className="w-4 h-4 mr-2" />
              Post New Job
            </Link>
          </div>

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

          {/* Recent Jobs */}
          <RoundedCard className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-caveat text-2xl font-bold text-black">
                Recent Jobs
              </h2>
              <Link
                to="/client/projects"
                className="font-poppins text-sm text-gray-600 hover:text-black flex items-center"
              >
                View All
                <FiArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentJobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/client/job/${job.id}`}
                  className="block p-4 bg-[#F8F8F8] rounded-[10px] hover:bg-[#EDEDED] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="mb-2 sm:mb-0">
                      <h3 className="font-poppins text-sm font-medium text-black">
                        {job.title}
                      </h3>
                      <p className="font-poppins text-xs text-gray-500">
                        Posted {job.posted} • {job.bids} bids
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-caveat text-lg font-bold text-black">
                        {job.budget}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-[8px] font-poppins text-xs ${job.status === 'Active' ? 'bg-black text-white' : 'bg-[#EDEDED] text-gray-700'}`}
                      >
                        {job.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </RoundedCard>
        </div>
      </main>

      <BottomNav role="client" />
    </div>
  )
}

export default ClientDashboard;
