
import React from 'react'
import { Link } from 'react-router-dom'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { FiMapPin, FiBriefcase, FiArrowRight, FiCheckCircle, FiDollarSign, FiClock, FiUser } from 'react-icons/fi'

export function JobCard({ job }) {
  // Determine if it's a Milestone job
  const hasMilestones = job.milestones && job.milestones.length > 0;
  
  // Get active milestone for milestone jobs
  const activeMilestone = hasMilestones 
    ? job.milestones.find(m => m.status === 'in-progress') || job.milestones[0]
    : null;

  return (
    <RoundedCard className="p-0 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col border-0 shadow-sm ring-1 ring-gray-100">
      {/* Top Banner Status */}
      <div className={`h-2 w-full ${job.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />

      <div className="p-6 flex flex-col flex-1">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
               <span className={`px-2.5 py-0.5 rounded-full text-[10px] items-center font-bold font-poppins uppercase tracking-wider ${
                job.status === 'active' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-gray-100 text-gray-600'
              }`}>
                {job.status === 'active' ? '● Active' : job.status}
              </span>
              <span className="text-[10px] font-poppins text-gray-400 flex items-center">
                 <FiClock className="w-3 h-3 mr-1" />
                 Due {job.deadline}
              </span>
            </div>
            <h3 className="font-poppins text-lg font-bold text-gray-900 leading-tight line-clamp-2 min-h-[3.5rem] mt-1">
              {job.title}
            </h3>
          </div>
        </div>

        {/* Client & Metadata */}
        <div className="flex flex-col space-y-2 mb-6">
           <div className="flex items-center text-xs text-gray-500 font-poppins">
             <FiUser className="w-3.5 h-3.5 mr-2 text-gray-400" />
             <span>{job.clientName || 'Client'}</span>
           </div>
           <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-500 font-poppins">
                <FiMapPin className="w-3.5 h-3.5 mr-2 text-gray-400" />
                {job.location || 'Remote'}
              </div>
              <div className="flex items-center text-xs text-gray-500 font-poppins">
                <FiBriefcase className="w-3.5 h-3.5 mr-2 text-gray-400" />
                {job.budgetType}
              </div>
           </div>
        </div>

        {/* Progress / Value Section (The main differentiator) */}
        <div className="mt-auto bg-gray-50 rounded-[12px] p-4 border border-gray-100 relative group-hover:border-gray-200 transition-colors">
          {hasMilestones && activeMilestone ? (
             <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                 <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
                 Current Milestone
               </p>
               <div className="flex justify-between items-end">
                 <div className="flex-1 pr-2">
                   <p className="font-poppins text-sm font-medium text-gray-800 line-clamp-1" title={activeMilestone.title}>
                     {activeMilestone.title}
                   </p>
                   <p className="text-[10px] text-gray-500 mt-0.5">Step {job.milestones.indexOf(activeMilestone) + 1} of {job.milestones.length}</p>
                 </div>
                 <span className="font-caveat text-xl font-bold text-blue-600 leading-none">
                   {activeMilestone.amount}
                 </span>
               </div>
               
               {/* Mini Progress Bar */}
               <div className="w-full bg-gray-200 h-1 mt-3 rounded-full overflow-hidden">
                 <div 
                   className="bg-blue-500 h-full rounded-full" 
                   style={{ width: `${((job.milestones.indexOf(activeMilestone)) / job.milestones.length) * 100}%` }} // Simplified progress
                 ></div>
               </div>
             </div>
          ) : (
            <div>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span>
                 Contract Value
               </p>
               <div className="flex justify-between items-center">
                 <span className="font-poppins text-sm font-medium text-gray-600">
                   Total Compensation
                 </span>
                 <span className="font-caveat text-2xl font-bold text-green-700">
                   {job.budget}
                 </span>
               </div>
             </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-2">
            <Link 
              to={`/freelancer/job/${job.id}`}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-white border border-black text-black font-poppins text-sm font-medium rounded-[8px] hover:bg-black hover:text-white transition-all group"
            >
              <span>View Workroom</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
      </div>
    </RoundedCard>
  )
}
