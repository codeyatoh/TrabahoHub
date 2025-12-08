import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { MilestoneTracker } from '../../../shared/components/MilestoneTracker'
import { EscrowStatus } from '../../../shared/components/EscrowStatus'
import { ReviewModal } from '../../../shared/components/ReviewModal'
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal'
import {
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMessageSquare,
  FiStar,
  FiAward,
  FiTrendingDown,
} from 'react-icons/fi'

import { useUser } from '../../../context/UserContext'
import { getJobsByClientId, updateJob } from '../../../services/mockData'
import { deleteJob } from '../../../services/mockData'
import { PostJobModal } from '../../../shared/components/PostJobModal'
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi'

export function ClientJobs() {
  const { currentUser } = useUser()
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false)
  const [jobToEdit, setJobToEdit] = useState(null)
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
    variant: 'primary',
    confirmLabel: 'Confirm'
  })

  // Load projects on mount
  React.useEffect(() => {
    if (currentUser?.id) {
      // Filter for "Newly Posted" / Bidding jobs only (Active, No Freelancer)
      const activeJobs = getJobsByClientId(currentUser.id).filter(
        job => job.status === 'active'
      )
      setProjects(activeJobs)
      if (activeJobs.length > 0 && !selectedProject) {
        setSelectedProject(activeJobs[0])
      } else if (activeJobs.length === 0) {
        setSelectedProject(null)
      }
    }
  }, [currentUser, isPostJobModalOpen])

  const calculateProgress = (project) => {
    if (!project.milestones || project.milestones.length === 0) return 0
    const completed = project.milestones.filter(m => m.status === 'approved').length
    return Math.round((completed / project.milestones.length) * 100)
  }

  const handleCreateJob = () => {
    setJobToEdit(null)
    setIsPostJobModalOpen(true)
  }

  const handleEditJob = (e, project) => {
    e.stopPropagation() // Prevent selecting the project
    setJobToEdit(project)
    setIsPostJobModalOpen(true)
  }

  const handleDeleteJob = (e, jobId) => {
    e.stopPropagation()
    setConfirmModal({
      isOpen: true,
      title: 'Delete Job',
      message: 'Are you sure you want to delete this job? This action cannot be undone.',
      variant: 'danger',
      confirmLabel: 'Delete',
      onConfirm: () => {
        if (deleteJob(jobId)) {
          const updatedProjects = projects.filter(p => p.id !== jobId)
          setProjects(updatedProjects)
          if (selectedProject?.id === jobId) {
             setSelectedProject(updatedProjects.length > 0 ? updatedProjects[0] : null)
          }
        }
      }
    })
  }
  /* Funding Logic */
  const handleFundProject = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Fund Project',
      message: 'Proceed to fund this project? (Simulated Payment)',
      variant: 'primary',
      confirmLabel: 'Fund',
      onConfirm: () => {
        toast.success('Project funded successfully! Amount is now in Escrow.')
        const updatedProject = { ...selectedProject, escrowStatus: 'funded' }
        setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p))
        setSelectedProject(updatedProject)
      }
    })
  }

  const handleApproveMilestone = (milestoneId) => {
    if (!selectedProject) return

    const milestoneIndex = selectedProject.milestones.findIndex(m => m.id === milestoneId)
    if (milestoneIndex === -1) return

    const updatedMilestones = [...selectedProject.milestones]
    updatedMilestones[milestoneIndex] = {
      ...updatedMilestones[milestoneIndex],
      status: 'approved'
    }

    updateJob(selectedProject.id, { milestones: updatedMilestones })

    const updatedProject = { ...selectedProject, milestones: updatedMilestones, progress: calculateProgress({ ...selectedProject, milestones: updatedMilestones }) }
    setProjects(projects.map(p => p.id === selectedProject.id ? updatedProject : p))
    setSelectedProject(updatedProject)
    
    toast.success('Milestone approved! Payment has been released.')
  }
  const handleSubmitReview = (rating, review) => {
    console.log('Review submitted:', {
      rating,
      review,
    })
    toast.success('Thank you for your review!')
  }
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
      case 'in-progress':
        return FiClock
      case 'completed':
        return FiCheckCircle
      case 'cancelled':
        return FiAlertCircle
      default:
        return FiClock
    }
  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
      case 'in-progress':
        return 'text-blue-500 bg-blue-50'
      case 'completed':
        return 'text-green-500 bg-green-50'
      case 'cancelled':
        return 'text-red-500 bg-red-50'
      default:
        return 'text-gray-500 bg-gray-50'
    }
  }
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="font-caveat text-4xl font-bold text-black mb-2">
                Your Posted Jobs
              </h1>
              <p className="font-poppins text-gray-600">
                Manage your job postings, edit details, and review bids.
              </p>
            </div>
            {/* Post Job Button removed as per request (moved to Dashboard) */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects List */}
            <div className="lg:col-span-1">
              <RoundedCard className="p-4">
                <h2 className="font-poppins text-sm font-semibold text-black mb-4">
                  All Jobs ({projects.length})
                </h2>
                <div className="space-y-2">
                  {projects.map((project) => {
                    const StatusIcon = getStatusIcon(project.status)
                    const progress = calculateProgress(project)
                    return (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`w-full text-left p-4 rounded-[10px] transition-all group relative ${selectedProject?.id === project.id ? 'bg-black text-white' : 'bg-[#F8F8F8] hover:bg-[#EDEDED]'}`}
                      >
                         {/* Edit/Delete Actions (Visible on Hover) */}
                         <div className={`absolute top-2 right-2 flex space-x-1 ${selectedProject?.id === project.id ? 'text-white' : 'text-gray-500'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                            <div 
                              onClick={(e) => handleEditJob(e, project)}
                              className="p-1 hover:bg-gray-700/20 rounded cursor-pointer"
                            >
                              <FiEdit2 className="w-3 h-3" />
                            </div>
                            <div
                              onClick={(e) => handleDeleteJob(e, project.id)}
                              className="p-1 hover:bg-red-500/20 text-red-500 rounded cursor-pointer"
                            >
                              <FiTrash2 className="w-3 h-3" />
                            </div>
                         </div>

                        <div className="flex items-start justify-between mb-2 pr-12">
                          <h3 className="font-poppins text-sm font-medium line-clamp-2">
                            {project.title}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                           <StatusIcon
                            className={`w-3 h-3 ${selectedProject?.id === project.id ? 'text-white' : 'text-gray-400'}`}
                           />
                           <span className={`font-poppins text-xs capitalize ${selectedProject?.id === project.id ? 'text-gray-300' : 'text-gray-500'}`}>
                              {project.status.replace('-', ' ')}
                           </span>
                        </div>

                        <p
                          className={`font-poppins text-xs mb-2 ${selectedProject?.id === project.id ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                          {project.freelancer || 'No Freelancer Assigned'}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-poppins text-xs">Progress</span>
                          <span className="font-poppins text-xs">
                            {progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div
                            className={`h-1.5 rounded-full ${selectedProject?.id === project.id ? 'bg-white' : 'bg-black'}`}
                            style={{
                              width: `${progress}%`,
                            }}
                          ></div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </RoundedCard>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-2">
              {selectedProject ? (

                <div className="space-y-6">
                  {/* Project Info */}
                  <RoundedCard className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h2 className="font-caveat text-2xl font-bold text-black mb-2">
                          {selectedProject.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-gray-500">
                          <span className="flex items-center font-poppins text-sm">
                            <FiUser className="w-4 h-4 mr-1" />
                            {selectedProject.freelancer || 'No Freelancer'}
                          </span>
                          <span className="flex items-center font-poppins text-sm">
                            <FiClock className="w-4 h-4 mr-1" />
                            Due {selectedProject.deadline}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span
                          className={`px-4 py-2 rounded-[8px] font-poppins text-sm font-medium capitalize ${getStatusColor(selectedProject.status)}`}
                        >
                          {selectedProject.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-poppins text-xs text-gray-500 mb-1">
                          Total Budget
                        </p>
                        <p className="font-caveat text-2xl font-bold text-black">
                          {selectedProject.budget}
                        </p>
                      </div>
                      <div>
                        <p className="font-poppins text-xs text-gray-500 mb-1">
                          Progress
                        </p>
                        <p className="font-caveat text-2xl font-bold text-black">
                           {calculateProgress(selectedProject)}%
                        </p>
                      </div>
                    </div>
                  </RoundedCard>

                  {/* Escrow Status */}
                  <EscrowStatus
                    status={selectedProject.escrowStatus || 'not-funded'}
                    amount={selectedProject.budget}
                    showActions={true}
                    onFund={handleFundProject}
                  />

                  {/* Bids or Milestones */}
                  <div>
                    {selectedProject.status === 'active' ? (
                       <div>
                        <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                          Received Bids ({selectedProject.bids ? selectedProject.bids.length : 0})
                        </h3>
                        <div className="space-y-4">
                        {selectedProject.bids && selectedProject.bids.length > 0 ? (
                            selectedProject.bids.map((bid, index) => (
                              <RoundedCard key={bid.id} className="p-6">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                                  <div className="flex items-start space-x-4 mb-4 sm:mb-0">
                                    <div className="w-12 h-12 bg-[#F8F8F8] rounded-full flex items-center justify-center font-caveat text-xl">
                                      {bid.freelancerName ? bid.freelancerName.charAt(0) : '?'}
                                    </div>
                                    <div>
                                      <h3 className="font-caveat text-xl font-semibold text-black">
                                        {bid.freelancerName}
                                      </h3>
                                      <p className="font-poppins text-sm text-gray-500">
                                        {bid.location}
                                      </p>
                                      <div className="flex items-center space-x-4 mt-1">
                                        <div className="flex items-center">
                                          <FiStar className="w-4 h-4 text-black fill-current" />
                                          <span className="font-poppins text-sm text-black ml-1">
                                            {bid.rating}
                                          </span>
                                        </div>
                                        <div className="flex items-center text-gray-500">
                                          <FiAward className="w-4 h-4 mr-1" />
                                          <span className="font-poppins text-xs">
                                            {bid.completedJobs} jobs
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-caveat text-2xl font-bold text-black">
                                      {bid.amount}
                                    </p>
                                    <div className="flex items-center justify-end text-gray-500 mt-1">
                                      <FiClock className="w-3 h-3 mr-1" />
                                      <p className="font-poppins text-xs">{bid.duration}</p>
                                    </div>
                                  </div>
                                </div>
                                <p className="font-poppins text-sm text-gray-700 mt-4 mb-4">
                                  {bid.proposal}
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                  <button
                                    className="flex-1 py-2 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                                  >
                                    Accept Bid & Hire
                                  </button>
                                  <Link 
                                    to="/client/messages"
                                    className="flex-1 py-2 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors flex items-center justify-center">
                                    <FiMessageSquare className="w-4 h-4 mr-2" />
                                    Message
                                  </Link>
                                </div>
                              </RoundedCard>
                            ))
                          ) : (
                             <p className="text-gray-500 font-poppins text-sm">No bids received yet.</p>
                          )}
                        </div>
                       </div>
                    ) : (
                      <div>
                        <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                          Project Milestones
                        </h3>
                        <MilestoneTracker
                          milestones={selectedProject.milestones || []}
                          onApprove={handleApproveMilestone}
                          userRole="client"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <RoundedCard className="p-12 text-center">
                  <p className="font-poppins text-gray-500">
                    Select a job to view details or post a new one.
                  </p>
                </RoundedCard>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="client" />

      {/* Review Modal */}
      {selectedProject && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onSubmit={handleSubmitReview}
          recipientName={selectedProject.freelancer || 'Freelancer'}
          recipientRole="freelancer"
        />
      )}

      {/* Post/Edit Job Modal */}
      <PostJobModal 
        isOpen={isPostJobModalOpen} 
        onClose={() => setIsPostJobModalOpen(false)} 
        jobToEdit={jobToEdit}
      />
      
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        variant={confirmModal.variant}
        confirmLabel={confirmModal.confirmLabel}
      />
    </div>
  )
}

export default ClientJobs
