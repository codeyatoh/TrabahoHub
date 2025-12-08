// Mock Data Service
// Provides realistic dummy data for prototype demonstration

import angelitoImg from '../assets/images/Angelito-Halmain.jpg'
import jhonHaroldImg from '../assets/images/Jhon-Harold-Rueda.jpg'
import jhonChristianImg from '../assets/images/John-Christian-Saporno.jpg'
import aivyImg from '../assets/images/Aivy-Gonzales.jpg'
import jonathanImg from '../assets/images/Jonathan-Rolter-Dagondon.jpg'

// Mock Users
export const mockUsers = [
  {
    id: 'client-1',
    name: 'Aivy Gonzales',
    email: 'aivy@trabahohub.com',
    password: 'client123',
    role: 'client',
    location: 'Quezon City',
    memberSince: 'January 2023',
    completedJobs: 5,
    totalSpent: '₱125,000',
    rating: 4.8,
    image: aivyImg,
  },
  {
    id: 'freelancer-1',
    name: 'Angelito Halmain',
    email: 'angelito@trabahohub.com',
    password: 'freelancer123',
    role: 'freelancer',
    location: 'Cebu City',
    memberSince: 'June 2022',
    completedJobs: 52,
    totalEarned: '₱450,000',
    rating: 4.9,
    image: angelitoImg,
  },
  {
    id: 'freelancer-2',
    name: 'Jhon Harold Rueda',
    email: 'jhonharold@trabahohub.com',
    password: 'freelancer123',
    role: 'freelancer',
    location: 'Manila',
    memberSince: 'August 2022',
    completedJobs: 87,
    totalEarned: '₱780,000',
    rating: 5.0,
    image: jhonHaroldImg,
  },
  {
    id: 'freelancer-3',
    name: 'Jhon Christian Saporno',
    email: 'jhonchristian@trabahohub.com',
    password: 'freelancer123',
    role: 'freelancer',
    location: 'Davao',
    memberSince: 'September 2022',
    completedJobs: 34,
    totalEarned: '₱280,000',
    rating: 4.8,
    image: jhonChristianImg,
  },
  {
    id: 'admin-1',
    name: 'Jonathan Rolter Dagondon',
    email: 'jonathan@trabahohub.com',
    password: 'admin123',
    role: 'admin',
    memberSince: 'January 2023',
    image: jonathanImg,
  },
];

// Mock Jobs
export const mockJobs = [
  {
    id: 'job-1',
    title: 'E-commerce Website Development',
    description: 'Looking for an experienced web developer to build a complete e-commerce website for my online clothing store. The website should have product listings, shopping cart, checkout with payment integration (GCash, Maya), and admin dashboard for inventory management.',
    category: 'Web Development',
    budget: '₱25,000',
    budgetType: 'fixed',
    deadline: '2024-03-15',
    posted: '2 days ago',
    status: 'active',
    clientId: 'client-1',
    clientName: 'Carlo Mendoza',
    skills: ['React', 'Node.js', 'MongoDB', 'Payment Integration'],
    escrowStatus: 'not-funded',
    bids: [
      {
        id: 'bid-1',
        jobId: 'job-1',
        freelancerId: 'freelancer-1',
        freelancerName: 'Maria Santos',
        location: 'Cebu City',
        rating: 4.9,
        completedJobs: 52,
        amount: '₱22,000',
        duration: '2 weeks',
        proposal: 'I have 5 years of experience building e-commerce websites. I can deliver a fully functional site with GCash and Maya integration.',
        status: 'pending',
        submittedDate: '2024-01-10',
      },
      {
        id: 'bid-2',
        jobId: 'job-1',
        freelancerId: 'freelancer-2',
        freelancerName: 'Juan Reyes',
        location: 'Manila',
        rating: 5.0,
        completedJobs: 87,
        amount: '₱25,000',
        duration: '10 days',
        proposal: "Expert in React and Node.js. I've built similar projects for local businesses. Can start immediately.",
        status: 'pending',
        submittedDate: '2024-01-10',
      },
      {
        id: 'bid-3',
        jobId: 'job-1',
        freelancerId: 'freelancer-3',
        freelancerName: 'Ana Garcia',
        location: 'Davao',
        rating: 4.8,
        completedJobs: 34,
        amount: '₱20,000',
        duration: '3 weeks',
        proposal: 'Full-stack developer with experience in payment integrations. Portfolio available upon request.',
        status: 'pending',
        submittedDate: '2024-01-11',
      },
    ],
  },
  {
    id: 'job-2',
    title: 'Mobile App UI/UX Design',
    description: 'Need a talented designer to create modern UI/UX designs for a food delivery mobile app. Should include user flow, wireframes, and high-fidelity mockups.',
    category: 'Graphic Design',
    budget: '₱15,000',
    budgetType: 'fixed',
    deadline: '2024-03-01',
    posted: '5 days ago',
    status: 'in-progress',
    clientId: 'client-1',
    clientName: 'Carlo Mendoza',
    freelancer: 'Angelito Halmain', // Added for display
    skills: ['Figma', 'UI/UX', 'Mobile Design'],
    escrowStatus: 'funded',
    hiredFreelancerId: 'freelancer-1',
    milestones: [
      {
        id: 'm1',
        title: 'User Flow & Wireframes',
        amount: '₱5,000',
        description: 'Complete user flow diagrams and low-fidelity wireframes',
        status: 'completed', // Changed to completed to test approval flow
        dueDate: '2024-02-10',
        submission: {
          link: 'https://figma.com/file/xyz',
          note: 'Here are the initial wireframes for your review.',
          date: '2024-02-09',
        },
      },
      {
        id: 'm2',
        title: 'High-Fidelity Mockups',
        amount: '₱7,000',
        description: 'Design all main screens with final UI',
        status: 'in-progress',
        dueDate: '2024-02-20',
      },
      {
        id: 'm3',
        title: 'Prototype & Handoff',
        amount: '₱3,000',
        description: 'Interactive prototype and design system documentation',
        status: 'pending',
        dueDate: '2024-03-01',
      },
    ],
    bids: [],
  },
  {
    id: 'job-3',
    title: 'Social Media Content Creation',
    description: 'Looking for a creative content creator for Instagram and Facebook. Need 20 posts per month with captions and hashtags.',
    category: 'Social Media',
    budget: '₱8,000',
    budgetType: 'fixed',
    deadline: '2024-02-28',
    posted: '1 week ago',
    status: 'active',
    clientId: 'client-1',
    clientName: 'Carlo Mendoza',
    skills: ['Social Media', 'Content Creation', 'Canva'],
    escrowStatus: 'not-funded',
    bids: [
      {
        id: 'bid-4',
        jobId: 'job-3',
        freelancerId: 'freelancer-3',
        freelancerName: 'Ana Garcia',
        location: 'Davao',
        rating: 4.8,
        completedJobs: 34,
        amount: '₱7,500',
        duration: '1 month',
        proposal: 'Experienced social media manager. I can create engaging content that drives interaction.',
        status: 'pending',
        submittedDate: '2024-01-08',
      },
    ],
  },
  {
    id: 'job-5',
    title: 'Logo Design - Fixed Price Example',
    description: 'Need a modern logo for a coffee shop startup.',
    budget: '₱5,000',
    budgetType: 'Fixed Price',
    location: 'Remote',
    posted: '3 days ago',
    deadline: '2024-03-20',
    skills: ['Logo Design', 'Illustrator'],
    clientId: 'client-1',
    clientName: 'Aivy Gonzales',
    status: 'active',
    hiredFreelancerId: 'freelancer-1',
    milestones: [], 
  },
];

// Mock Conversations
export const mockConversations = [
  {
    id: 'conv-1',
    jobId: 'job-2',
    jobTitle: 'Mobile App UI/UX Design',
    participants: ['client-1', 'freelancer-1'],
    participantNames: ['Carlo Mendoza', 'Maria Santos'],
    lastMessage: 'Great! I will start working on the mockups today.',
    lastMessageTime: '2 hours ago',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-1',
        senderId: 'client-1',
        senderName: 'Carlo Mendoza',
        content: 'Hi Maria! Thanks for accepting the project.',
        timestamp: '2024-01-15 10:00',
        read: true,
      },
      {
        id: 'msg-2',
        senderId: 'freelancer-1',
        senderName: 'Maria Santos',
        content: 'Hello! Happy to work with you. When can we discuss the requirements?',
        timestamp: '2024-01-15 10:15',
        read: true,
      },
      {
        id: 'msg-3',
        senderId: 'client-1',
        senderName: 'Carlo Mendoza',
        content: 'How about tomorrow at 2 PM? I can share the brand guidelines.',
        timestamp: '2024-01-15 10:30',
        read: true,
      },
      {
        id: 'msg-4',
        senderId: 'freelancer-1',
        senderName: 'Maria Santos',
        content: 'Perfect! Looking forward to it.',
        timestamp: '2024-01-15 10:45',
        read: true,
      },
      {
        id: 'msg-5',
        senderId: 'client-1',
        senderName: 'Carlo Mendoza',
        content: 'The wireframes look great! Can you proceed with the high-fidelity designs?',
        timestamp: '2024-01-20 14:00',
        read: true,
      },
      {
        id: 'msg-6',
        senderId: 'freelancer-1',
        senderName: 'Maria Santos',
        content: 'Great! I will start working on the mockups today.',
        timestamp: '2024-01-20 14:30',
        read: true,
      },
    ],
  },
  {
    id: 'conv-2',
    jobId: 'job-1',
    jobTitle: 'E-commerce Website Development',
    participants: ['client-1', 'freelancer-2'],
    participantNames: ['Carlo Mendoza', 'Juan Reyes'],
    lastMessage: 'I have a few questions about the payment integration.',
    lastMessageTime: '1 day ago',
    unreadCount: 2,
    messages: [
      {
        id: 'msg-7',
        senderId: 'freelancer-2',
        senderName: 'Juan Reyes',
        content: 'Hi! I submitted a bid for your e-commerce project.',
        timestamp: '2024-01-10 09:00',
        read: true,
      },
      {
        id: 'msg-8',
        senderId: 'client-1',
        senderName: 'Carlo Mendoza',
        content: 'Hello Juan! Your profile looks impressive. Can you share some examples?',
        timestamp: '2024-01-10 11:00',
        read: true,
      },
      {
        id: 'msg-9',
        senderId: 'freelancer-2',
        senderName: 'Juan Reyes',
        content: 'Sure! Here are 3 e-commerce sites I built: [links]',
        timestamp: '2024-01-10 13:00',
        read: true,
      },
      {
        id: 'msg-10',
        senderId: 'freelancer-2',
        senderName: 'Juan Reyes',
        content: 'I have a few questions about the payment integration.',
        timestamp: '2024-01-11 10:00',
        read: false,
      },
    ],
  },
];

// Mock Notifications
export const mockNotifications = [
  {
    id: 'notif-1',
    type: 'bid',
    title: 'New Bid Received',
    message: 'Juan Reyes submitted a bid for "E-commerce Website Development"',
    timestamp: '2 hours ago',
    read: false,
    link: '/client/job/job-1',
  },
  {
    id: 'notif-2',
    type: 'milestone',
    title: 'Milestone Completed',
    message: 'Maria Santos completed "User Flow & Wireframes" milestone',
    timestamp: '5 hours ago',
    read: false,
    link: '/client/projects',
  },
  {
    id: 'notif-3',
    type: 'message',
    title: 'New Message',
    message: 'You have a new message from Maria Santos',
    timestamp: '1 day ago',
    read: true,
    link: '/client/messages',
  },
  {
    id: 'notif-4',
    type: 'payment',
    title: 'Payment Released',
    message: 'Payment of ₱5,000 has been released to Maria Santos',
    timestamp: '2 days ago',
    read: true,
  },
];

// Mock Disputes
export const mockDisputes = [
  {
    id: 'dispute-1',
    jobId: 'job-4',
    jobTitle: 'Logo Design for Restaurant',
    clientId: 'client-1',
    clientName: 'Carlo Mendoza',
    freelancerId: 'freelancer-3',
    freelancerName: 'Ana Garcia',
    reason: 'Work not delivered as agreed',
    description: 'The freelancer delivered work that does not match the requirements discussed. Multiple revisions were requested but not completed.',
    status: 'open',
    filedBy: 'client',
    filedDate: '2024-01-18',
  },
  {
    id: 'dispute-2',
    jobId: 'job-5',
    jobTitle: 'Video Editing Project',
    clientId: 'client-1',
    clientName: 'Carlo Mendoza',
    freelancerId: 'freelancer-2',
    freelancerName: 'Juan Reyes',
    reason: 'Payment not released',
    description: 'I completed all the work as specified and submitted on time, but the client is refusing to release payment.',
    status: 'under-review',
    filedBy: 'freelancer',
    filedDate: '2024-01-15',
  },
  {
    id: 'dispute-3',
    jobId: 'job-6',
    jobTitle: 'Website Maintenance',
    clientId: 'client-1',
    clientName: 'Carlo Mendoza',
    freelancerId: 'freelancer-1',
    freelancerName: 'Maria Santos',
    reason: 'Scope disagreement',
    description: 'Client requested additional work beyond the original scope without additional payment.',
    status: 'resolved',
    filedBy: 'freelancer',
    filedDate: '2024-01-10',
  },
];

// Helper functions
export const getUserById = (id) => {
  return mockUsers.find((user) => user.id === id);
};

export const getJobById = (id) => {
  return mockJobs.find((job) => job.id === id);
};

export const getJobsByClientId = (clientId) => {
  return mockJobs.filter((job) => job.clientId === clientId);
};

export const getActiveJobs = () => {
  return mockJobs.filter((job) => job.status === 'active');
};

export const getBidsByFreelancerId = (freelancerId) => {
  const bids = [];
  mockJobs.forEach((job) => {
    job.bids.forEach((bid) => {
      if (bid.freelancerId === freelancerId) {
        bids.push(bid);
      }
    });
  });
  return bids;
};

export const getConversationsByUserId = (userId) => {
  return mockConversations.filter((conv) => conv.participants.includes(userId));
};

export const getNotificationsByUserId = (userId) => {
  // In a real app, notifications would be user-specific
  return mockNotifications;
};

export const getDisputesByStatus = (status) => {
  if (!status) return mockDisputes;
  return mockDisputes.filter((dispute) => dispute.status === status);
};

// Mock Transactions
export const mockTransactions = [
  {
    id: 'txn-1',
    userId: 'freelancer-1',
    type: 'earning',
    description: 'Payment for "Mobile App UI/UX Design" - Milestone 1',
    amount: 5000,
    status: 'completed',
    date: '2024-02-10',
    method: 'Escrow Release',
  },
  {
    id: 'txn-2',
    userId: 'freelancer-1',
    type: 'withdrawal',
    description: 'Withdrawal to GCash',
    amount: -3000,
    status: 'completed',
    date: '2024-02-12',
    method: 'GCash',
  },
  {
    id: 'txn-3',
    userId: 'freelancer-1',
    type: 'earning',
    description: 'Payment for "Logo Design" - Final',
    amount: 8000,
    status: 'pending',
    date: '2024-02-15',
    method: 'Escrow Release',
  },
];

export const getTransactionsByUserId = (userId) => {
  return mockTransactions.filter((txn) => txn.userId === userId);
};

// Client Helper Functions
export const addJob = (jobData) => {
  const newJob = {
    id: `job-${Date.now()}`,
    posted: new Date().toISOString(), // Use ISO string for consistency
    status: 'active',
    bids: [],
    milestones: [],
    escrowStatus: 'not-funded',
    progress: 0,
    ...jobData,
  };
  mockJobs.unshift(newJob); // Add to beginning of array
  return newJob;
};

export const getClientStats = (clientId) => {
  const clientJobs = getJobsByClientId(clientId);
  
  // Active Jobs
  const activeCount = clientJobs.filter(j => j.status === 'active' || j.status === 'in-progress').length;
  
  // Total Spent (Mock calculation based on budget of non-active jobs or just sum of all)
  // For simplicity, let's sum budget of all non-active jobs (assuming they are paid)
  // Or just a random number + sum of funded escrows
  // Let's parse the budget string "₱25,000" -> 25000
  const parseAmount = (str) => {
    if (!str) return 0;
    return parseFloat(str.replace(/[₱,]/g, '')) || 0;
  };

  const totalSpent = clientJobs.reduce((acc, job) => {
    // Only count if status is completed or in-progress (partial)
    // This is a rough estimate for the dashboard
    if (job.status === 'completed' || job.status === 'in-progress') {
       return acc + parseAmount(job.budget);
    }
    return acc;
  }, 0);

  // Messages count (unread)
  const conversations = getConversationsByUserId(clientId);
  const unreadMessages = conversations.reduce((acc, conv) => acc + conv.unreadCount, 0);

  return {
    activeJobs: activeCount.toString(),
    totalSpent: `₱${totalSpent.toLocaleString()}`,
  };
};

export const updateJob = (jobId, updates) => {
  const jobIndex = mockJobs.findIndex(j => j.id === jobId);
  if (jobIndex > -1) {
    mockJobs[jobIndex] = { ...mockJobs[jobIndex], ...updates };
    return mockJobs[jobIndex];
  }
  return null;
};

export const deleteJob = (jobId) => {
  const index = mockJobs.findIndex(j => j.id === jobId);
  if (index > -1) {
    mockJobs.splice(index, 1);
    return true;
  }
  return false;
};
