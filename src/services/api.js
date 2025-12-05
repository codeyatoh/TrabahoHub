// Mock API functions for TrabahoHub
// In production, these would make actual HTTP requests

// Mock data
const mockJobs = [
  {
    id: '1',
    title: 'Build a sari-sari store inventory app',
    description: 'Need a simple mobile app to track inventory for my sari-sari store.',
    budget: '₱15,000',
    budgetType: 'fixed',
    category: 'Web Development',
    skills: ['React Native', 'Firebase'],
    deadline: '2024-03-30',
    status: 'active',
    clientId: '1',
    createdAt: '2024-02-15',
  },
];

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
