import React from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiAlertCircle,
  FiArrowRight,
  FiTrendingUp,
} from 'react-icons/fi'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const stats = [
  {
    icon: FiUsers,
    label: 'Total Users',
    value: '12,458',
    trend: '+124 this week',
    color: 'bg-black',
  },
  {
    icon: FiBriefcase,
    label: 'Active Jobs',
    value: '1,847',
    trend: '+89 this week',
    color: 'bg-[#F8F8F8]',
  },
  {
    icon: FiDollarSign,
    label: 'Platform Revenue',
    value: '₱2.4M',
    trend: '+15% this month',
    color: 'bg-[#F8F8F8]',
  },
  {
    icon: FiAlertCircle,
    label: 'Open Reports',
    value: '23',
    trend: '5 urgent',
    color: 'bg-[#F8F8F8]',
  },
]

// User growth data
const userGrowthData = [
  { month: 'Sep', clients: 850, freelancers: 620 },
  { month: 'Oct', clients: 920, freelancers: 710 },
  { month: 'Nov', clients: 1100, freelancers: 850 },
  { month: 'Dec', clients: 1250, freelancers: 980 },
  { month: 'Jan', clients: 1400, freelancers: 1150 },
  { month: 'Feb', clients: 1580, freelancers: 1320 },
]

// Revenue trend data
const revenueData = [
  { month: 'Sep', revenue: 320000 },
  { month: 'Oct', revenue: 380000 },
  { month: 'Nov', revenue: 350000 },
  { month: 'Dec', revenue: 450000 },
  { month: 'Jan', revenue: 420000 },
  { month: 'Feb', revenue: 480000 },
]

// Jobs activity data
const jobsActivityData = [
  { month: 'Sep', posted: 280, completed: 245 },
  { month: 'Oct', posted: 320, completed: 290 },
  { month: 'Nov', posted: 350, completed: 310 },
  { month: 'Dec', posted: 410, completed: 365 },
  { month: 'Jan', posted: 380, completed: 340 },
  { month: 'Feb', posted: 420, completed: 375 },
]

const recentActivity = [
  {
    id: '1',
    type: 'user',
    message: 'New freelancer registered from Cebu',
    time: '5 min ago',
  },
  {
    id: '2',
    type: 'job',
    message: 'Job "E-commerce Website" completed',
    time: '15 min ago',
  },
  {
    id: '3',
    type: 'report',
    message: 'Dispute reported by client in Manila',
    time: '1 hour ago',
  },
  {
    id: '4',
    type: 'user',
    message: 'New client registered from Davao',
    time: '2 hours ago',
  },
  {
    id: '5',
    type: 'job',
    message: 'New job posted: "Logo Design for Milk Tea Shop"',
    time: '3 hours ago',
  },
]

const formatCurrency = (value) => `₱${(value / 1000).toFixed(0)}k`

import jonathanImg from '../../../assets/images/Jonathan-Rolter-Dagondon.jpg'

// ... existing imports ...

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="admin" />

      <main className="flex-1 lg:ml-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex items-center space-x-4">
            <img
              src={jonathanImg}
              alt="Jonathan Rolter Dagondon"
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h1 className="font-caveat text-4xl font-bold text-black mb-1">
                Hello, Jonathan!
              </h1>
              <p className="font-poppins text-gray-600">
                Platform overview and management
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <RoundedCard key={stat.label} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${stat.color} rounded-[10px] flex items-center justify-center`}
                  >
                    <stat.icon
                      className={`w-6 h-6 ${stat.color === 'bg-black' ? 'text-white' : 'text-black'}`}
                    />
                  </div>
                  <FiTrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <p className="font-caveat text-3xl font-bold text-black">
                  {stat.value}
                </p>
                <p className="font-poppins text-xs text-gray-500">
                  {stat.label}
                </p>
                <p className="font-poppins text-xs text-green-600 mt-1">
                  {stat.trend}
                </p>
              </RoundedCard>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth Chart */}
            <RoundedCard className="p-6">
              <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                User Growth
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={userGrowthData}>
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
                  />
                  <Tooltip
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
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#000000"
                    strokeWidth={2}
                    dot={{
                      fill: '#000000',
                      strokeWidth: 2,
                    }}
                    name="Clients"
                  />
                  <Line
                    type="monotone"
                    dataKey="freelancers"
                    stroke="#6B7280"
                    strokeWidth={2}
                    dot={{
                      fill: '#6B7280',
                      strokeWidth: 2,
                    }}
                    name="Freelancers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </RoundedCard>

            {/* Revenue Trend Chart */}
            <RoundedCard className="p-6">
              <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                Platform Revenue
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
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
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `₱${value.toLocaleString()}`,
                      'Revenue',
                    ]}
                    contentStyle={{
                      borderRadius: '10px',
                      border: '1px solid #EDEDED',
                      fontFamily: 'Poppins',
                    }}
                  />
                  <Bar dataKey="revenue" fill="#000000" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </RoundedCard>
          </div>

          {/* Jobs Activity Chart - Full Width */}
          <RoundedCard className="p-6 mb-8">
            <h3 className="font-caveat text-2xl font-bold text-black mb-4">
              Jobs Activity
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobsActivityData}>
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
                />
                <Tooltip
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
                <Line
                  type="monotone"
                  dataKey="posted"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{
                    fill: '#000000',
                    strokeWidth: 2,
                  }}
                  name="Jobs Posted"
                />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{
                    fill: '#10B981',
                    strokeWidth: 2,
                  }}
                  name="Jobs Completed"
                />
              </LineChart>
            </ResponsiveContainer>
          </RoundedCard>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <RoundedCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-caveat text-2xl font-bold text-black">
                    Recent Activity
                  </h2>
                  <button className="font-poppins text-sm text-gray-600 hover:text-black">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 bg-[#F8F8F8] rounded-[10px]"
                    >
                      <div
                        className={`w-2 h-2 mt-2 rounded-full ${activity.type === 'report' ? 'bg-red-500' : activity.type === 'user' ? 'bg-green-500' : 'bg-blue-500'}`}
                      />
                      <div className="flex-1">
                        <p className="font-poppins text-sm text-black">
                          {activity.message}
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </RoundedCard>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <RoundedCard className="p-6">
                <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Link
                    to="/admin/users"
                    className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px] hover:bg-[#EDEDED] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FiUsers className="w-5 h-5 text-black" />
                      <span className="font-poppins text-sm text-black">
                        Manage Users
                      </span>
                    </div>
                    <FiArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    to="/admin/jobs"
                    className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px] hover:bg-[#EDEDED] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FiBriefcase className="w-5 h-5 text-black" />
                      <span className="font-poppins text-sm text-black">
                        Manage Jobs
                      </span>
                    </div>
                    <FiArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px] hover:bg-[#EDEDED] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <FiAlertCircle className="w-5 h-5 text-black" />
                      <span className="font-poppins text-sm text-black">
                        View Reports
                      </span>
                    </div>
                    <FiArrowRight className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              </RoundedCard>

              {/* Platform Health */}
              <RoundedCard className="p-6 mt-6 bg-black text-white">
                <h3 className="font-caveat text-xl font-bold mb-4">
                  Platform Health
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-sm text-gray-300">
                      Uptime
                    </span>
                    <span className="font-poppins text-sm text-green-400">
                      99.9%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-sm text-gray-300">
                      Response Time
                    </span>
                    <span className="font-poppins text-sm text-green-400">
                      45ms
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-sm text-gray-300">
                      Active Sessions
                    </span>
                    <span className="font-poppins text-sm text-white">
                      1,247
                    </span>
                  </div>
                </div>
              </RoundedCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
