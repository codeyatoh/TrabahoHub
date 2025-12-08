import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { fetchMyAcceptedJobs } from '../../../services/api'
import { JobCard } from '../components/JobCard'
import { useUser } from '../../../context/UserContext'
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiExternalLink
} from 'react-icons/fi'

export default function FreelancerMyJobs() {
  const { currentUser } = useUser()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        if (currentUser?.id) {
          const data = await fetchMyAcceptedJobs(currentUser.id)
          setJobs(data)
        }
      } catch (error) {
        console.error('Failed to load jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [currentUser])

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              My Jobs
            </h1>
            <p className="font-poppins text-gray-600">
              Manage your active contracts and accepted bids
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-[20px] border border-[#EDEDED]">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiBriefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 font-poppins mb-2">
                No Jobs Found
              </h3>
              <p className="text-gray-500 font-poppins mb-6">
                You haven't been hired for any jobs yet. Start bidding!
              </p>
              <Link
                to="/freelancer/browse-jobs"
                className="inline-flex items-center px-6 py-3 bg-black text-white rounded-[10px] font-medium font-poppins hover:bg-gray-800 transition-colors"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  )
}
