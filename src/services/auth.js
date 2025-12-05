// Mock authentication functions for TrabahoHub
// In production, these would integrate with a real auth provider

// Mock current user (simulates logged-in state)
let currentUser = null;

export async function login(email, password, role) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock validation
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Create mock user based on role
  currentUser = {
    id: '1',
    name: role === 'client' ? 'Juan Dela Cruz' : 'Maria Santos',
    email,
    role,
  };

  // Store in localStorage for persistence
  localStorage.setItem('trabahohub_user', JSON.stringify(currentUser));

  return currentUser;
}

export async function loginAsAdmin(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  currentUser = {
    id: 'admin-1',
    name: 'Admin User',
    email,
    role: 'admin',
  };

  localStorage.setItem('trabahohub_user', JSON.stringify(currentUser));

  return currentUser;
}

export async function logout() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  currentUser = null;
  localStorage.removeItem('trabahohub_user');
}

export function getCurrentUser() {
  if (currentUser) return currentUser;

  // Try to restore from localStorage
  const stored = localStorage.getItem('trabahohub_user');
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }

  return null;
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}

export async function register(data) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  currentUser = {
    id: String(Date.now()),
    name: data.name,
    email: data.email,
    role: data.role,
  };

  localStorage.setItem('trabahohub_user', JSON.stringify(currentUser));

  return currentUser;
}
