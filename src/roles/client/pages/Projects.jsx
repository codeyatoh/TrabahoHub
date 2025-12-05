import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { MilestoneTracker } from '../../../shared/components/MilestoneTracker'
import { EscrowStatus } from '../../../shared/components/EscrowStatus'
import { ReviewModal } from '../../../shared/components/ReviewModal'
import {
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMessageSquare,
} from 'react-icons/fi'

const mockProjects = [
  {
    id: 'proj-1',
    title: 'Mobile App UI/UX Design',
    freelancer: 'Maria Santos',
    freelancerId: 'freelancer-1',
    status: 'in-progress',
    budget: '₱15,000',
    deadline: '2024-03-01',
    progress: 50,
    escrowStatus: 'funded',
    milestones: [
      {
        id: 'milestone-1',
        title: 'User Flow & Wireframes',
        amount: '₱5,000',
        description: 'Complete user flow diagrams and low-fidelity wireframes',
        status: 'approved',
        dueDate: '2024-02-10',
      },
      {
        id: 'milestone-2',
        title: 'High-Fidelity Mockups',
        amount: '₱7,000',
        description: 'Design all main screens with final UI',
        status: 'completed',
        dueDate: '2024-02-20',
      },
      {
        id: 'milestone-3',
        title: 'Prototype & Handoff',
        amount: '₱3,000',
        description: 'Interactive prototype and design system documentation',
        status: 'pending',
        dueDate: '2024-03-01',
      },
    ],
  },
  {
    id: 'proj-2',
    title: 'E-commerce Website Development',
    freelancer: 'Juan Reyes',
    freelancerId: 'freelancer-2',
    status: 'in-progress',
    budget: '₱25,000',
    deadline: '2024-03-15',
    progress: 30,
    escrowStatus: 'funded',
    milestones: [
      {
        id: 'milestone-4',
        title: 'Frontend Development',
        amount: '₱10,000',
        description: 'Build all frontend pages and components',
        status: 'in-progress',
        dueDate: '2024-02-25',
      },
      {
        id: 'milestone-5',
        title: 'Backend & Payment Integration',
        amount: '₱10,000',
        description: 'API development and payment gateway setup',
        status: 'pending',
        dueDate: '2024-03-10',
      },
      {
        id: 'milestone-6',
        title: 'Testing & Deployment',
        amount: '₱5,000',
        description: 'Quality assurance and production deployment',
        status: 'pending',
        dueDate: '2024-03-15',
      },
    ],
  },
  {
    id: 'proj-3',
    title: 'Logo Design for Restaurant',
    freelancer: 'Ana Garcia',
    freelancerId: 'freelancer-3',
    status: 'completed',
    budget: '₱8,000',
    deadline: '2024-01-20',
    progress: 100,
    escrowStatus: 'released',
    milestones: [
      {
        id: 'milestone-7',
        title: 'Logo Design',
        amount: '₱8,000',
        description: 'Complete logo design with 3 concepts and revisions',
        status: 'approved',
        dueDate: '2024-01-20',
      },
    ],
  },
  ]
export function Projects() {
  const [selectedProject, setSelectedProject] = useState(
    mockProjects[0],
  )
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [projects, setProjects] = useState(mockProjects)
  const handleApproveMilestone = (milestoneId) => {
    if (!selectedProject) return
    const updatedProjects = projects.map((proj) => {
      if (proj.id === selectedProject.id) {
        const updatedMilestones = proj.milestones.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                status: 'approved',
              }
            : m,
        )
        return {
          ...proj,
          milestones: updatedMilestones,
        }
      }
      return proj
    })
    setProjects(updatedProjects)
    setSelectedProject(
      updatedProjects.find((p) => p.id === selectedProject.id) || null,
    )
    alert('Milestone approved! Payment has been released to the freelancer.')
  }
  const handleSubmitReview = (rating, review) => {
    console.log('Review submitted:', {
      rating,
      review,
    })
    alert('Thank you for your review!')
  }
  const getStatusIcon = (status) => {
    switch (status) {
      case 'in-progress':
        return FiClock
      case 'completed':
        return FiCheckCircle
      case 'cancelled':
        return FiAlertCircle
    }
  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'in-progress':
        return 'text-blue-500 bg-blue-50'
      case 'completed':
        return 'text-green-500 bg-green-50'
      case 'cancelled':
        return 'text-red-500 bg-red-50'
    }
  }
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              My Projects
            </h1>
            <p className="font-poppins text-gray-600">
              Track progress and manage your active projects
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Projects List */}
            <div className="lg:col-span-1">
              <RoundedCard className="p-4">
                <h2 className="font-poppins text-sm font-semibold text-black mb-4">
                  All Projects ({projects.length})
                </h2>
                <div className="space-y-2">
                  {projects.map((project) => {
                    const StatusIcon = getStatusIcon(project.status)
                    return (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`w-full text-left p-4 rounded-[10px] transition-all ${selectedProject?.id === project.id ? 'bg-black text-white' : 'bg-[#F8F8F8] hover:bg-[#EDEDED]'}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-poppins text-sm font-medium line-clamp-2">
                            {project.title}
                          </h3>
                          <StatusIcon
                            className={`w-4 h-4 flex-shrink-0 ml-2 ${selectedProject?.id === project.id ? 'text-white' : 'text-gray-400'}`}
                          />
                        </div>
                        <p
                          className={`font-poppins text-xs mb-2 ${selectedProject?.id === project.id ? 'text-gray-300' : 'text-gray-500'}`}
                        >
                          {project.freelancer}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-poppins text-xs capitalize">
                            {project.status.replace('-', ' ')}
                          </span>
                          <span className="font-poppins text-xs">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                          <div
                            className={`h-1.5 rounded-full ${selectedProject?.id === project.id ? 'bg-white' : 'bg-black'}`}
                            style={{
                              width: `${project.progress}%`,
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
            <div className="lg:col-span-2 space-y-6">
              {selectedProject ? (
                <>
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
                            {selectedProject.freelancer}
                          </span>
                          <span className="flex items-center font-poppins text-sm">
                            <FiClock className="w-4 h-4 mr-1" />
                            Due {selectedProject.deadline}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-[8px] font-poppins text-sm font-medium capitalize ${getStatusColor(selectedProject.status)}`}
                      >
                        {selectedProject.status.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
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
                          {selectedProject.progress}%
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to="/client/messages"
                        className="flex-1 py-2 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors flex items-center justify-center"
                      >
                        <FiMessageSquare className="w-4 h-4 mr-2" />
                        Message Freelancer
                      </Link>
                      {selectedProject.status === 'completed' && (
                        <button
                          onClick={() => setShowReviewModal(true)}
                          className="flex-1 py-2 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
                        >
                          Leave Review
                        </button>
                      )}
                    </div>
                  </RoundedCard>

                  {/* Escrow Status */}
                  <EscrowStatus
                    status={selectedProject.escrowStatus}
                    amount={selectedProject.budget}
                    showActions={false}
                  />

                  {/* Milestones */}
                  <div>
                    <h3 className="font-caveat text-2xl font-bold text-black mb-4">
                      Project Milestones
                    </h3>
                    <MilestoneTracker
                      milestones={selectedProject.milestones}
                      onApprove={handleApproveMilestone}
                      userRole="client"
                    />
                  </div>
                </>
              ) : (
                <RoundedCard className="p-12 text-center">
                  <p className="font-poppins text-gray-500">
                    Select a project to view details
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
          recipientName={selectedProject.freelancer}
          recipientRole="freelancer"
        />
      )}
    </div>
  )
}

export default Projects;
