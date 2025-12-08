// Mock API functions for TrabahoHub
// In production, these would make actual HTTP requests

import { mockJobs } from './mockData';

// API Functions
export async function fetchJobs(filters) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockJobs;
}

export async function fetchJobById(id) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockJobs.find((job) => job.id === id) || null;
}

export async function postJob(jobData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const newJob = {
    ...jobData,
    id: String(mockJobs.length + 1),
    status: 'active',
    createdAt: new Date().toISOString(),
  };
  mockJobs.push(newJob);
  return newJob;
}

export async function submitBid(bidData) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    ...bidData,
    id: String(Date.now()),
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
}

export async function fetchUserProfile(userId) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  // Return mock user data
  return {
    id: userId,
    name: 'Maria Santos',
    email: 'maria@email.com',
    role: 'freelancer',
    location: 'Cebu City',
    bio: 'Experienced full-stack developer',
    skills: ['React', 'Node.js', 'TypeScript'],
    rate: '₱500/hr',
    rating: 4.9,
    completedJobs: 52,
  };
}

export async function updateUserProfile(userId, data) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    id: userId,
    name: data.name || 'Maria Santos',
    email: data.email || 'maria@email.com',
    role: 'freelancer',
    location: data.location || 'Cebu City',
    ...data,
  };
}

export async function fetchMyAcceptedJobs(freelancerId) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockJobs.filter((job) => {
    // Check if freelancer is exclusively hired
    const isHired = job.hiredFreelancerId === freelancerId;
    
    // Check if freelancer has an accepted bid
    const hasAcceptedBid = job.bids && job.bids.some(
      (bid) => bid.freelancerId === freelancerId && bid.status === 'accepted'
    );

    return isHired || hasAcceptedBid;
  });
}

export async function submitWork(jobId, workData) {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    success: true,
    message: 'Work submitted successfully',
    data: {
      ...workData,
      submittedAt: new Date().toISOString(),
      status: 'pending_review'
    }
  };
}

export async function fetchTransactions(userId) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  // Use hardcoded mock data for now since we can't easily import from mockData
  // without potentially breaking imports if not done carefully.
  // Ideally, we should import mockTransactions from mockData.
  return [
    {
      id: 'txn-1',
      type: 'earning',
      description: 'Payment for "Mobile App UI/UX Design" - Milestone 1',
      amount: 5000,
      status: 'completed',
      date: '2024-02-10',
      method: 'Escrow Release',
    },
    {
      id: 'txn-2',
      type: 'withdrawal',
      description: 'Withdrawal to GCash',
      amount: -3000,
      status: 'completed',
      date: '2024-02-12',
      method: 'GCash',
    },
     {
      id: 'txn-3',
      type: 'earning',
      description: 'Payment for "Logo Design" - Final',
      amount: 8000,
      status: 'pending',
      date: '2024-02-15',
      method: 'Escrow Release',
    },
  ];
}

export async function withdrawFunds(userId, amount, method) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    success: true,
    message: 'Withdrawal request submitted successfully',
    data: {
      id: `txn-${Date.now()}`,
      userId,
      type: 'withdrawal',
      description: `Withdrawal to ${method.name}`,
      amount: -amount,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      method: method.name,
    }
  };
}
