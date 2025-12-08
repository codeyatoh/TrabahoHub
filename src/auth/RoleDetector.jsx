import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoundedCard } from '../shared/components/RoundedCard'
import { FiBriefcase, FiUsers, FiCheck } from 'react-icons/fi'

export function RoleDetector() {
  const navigate = useNavigate()
  const [step, setStep] = useState('role')
  const [selectedRole, setSelectedRole] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setStep('signup')
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSignup = (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }
    // Mock signup - in production, this would call an API
    console.log('Signing up:', {
      ...formData,
      role: selectedRole,
    })
    // Redirect based on role
    if (selectedRole === 'client') {
      navigate('/client/dashboard')
    } else {
      navigate('/freelancer/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <a 
          href="/" 
          className="inline-flex items-center text-sm font-poppins font-medium text-gray-600 hover:text-black transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Landing Page
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {step === 'role' ? (
            <>
              {/* Role Selection */}
              <div className="text-center mb-8">
                <h1 className="font-caveat text-4xl font-bold text-black mb-2">
                  Join TrabahoHub
                </h1>
                <p className="font-poppins text-gray-600">
                  Choose how you want to get started
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client Card */}
                <RoundedCard
                  className="p-8 cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-black"
                  onClick={() => handleRoleSelect('client')}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiBriefcase className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-caveat text-2xl font-bold text-black mb-2">
                      I'm a Client
                    </h2>
                    <p className="font-poppins text-sm text-gray-600 mb-6">
                      Hire talented Filipino freelancers for your projects
                    </p>
                    <ul className="text-left space-y-3 mb-6">
                      <li className="flex items-start">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-poppins text-sm text-gray-700">
                          Post unlimited jobs
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-poppins text-sm text-gray-700">
                          Receive bids from qualified freelancers
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-poppins text-sm text-gray-700">
                          Secure escrow payment protection
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-poppins text-sm text-gray-700">
                          Milestone-based project management
                        </span>
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-black text-white font-poppins text-sm font-medium rounded-[10px] hover:bg-gray-800 transition-colors">
                      Get Started as Client
                    </button>
                  </div>
                </RoundedCard>

                {/* Freelancer Card */}
                <RoundedCard
                  className="p-8 cursor-pointer hover:shadow-xl transition-all border-2 border-transparent hover:border-black"
                  onClick={() => handleRoleSelect('freelancer')}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiUsers className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-caveat text-2xl font-bold text-black mb-2">
                      I'm a Freelancer
                    </h2>
                    <p className="font-poppins text-sm text-gray-600 mb-6">
                      Find projects and earn money doing what you love
                    </p>
                    <ul className="text-left space-y-3 mb-6">
                      <li className="flex items-start">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-poppins text-sm text-gray-700">
                          Browse thousands of jobs
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-poppins text-sm text-gray-700">
                          Submit competitive bids
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-poppins text-sm text-gray-700">
                          Get paid securely and on time
                        </span>
                      </li>
                      <li className="flex items-start">
                        <FiCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="font-poppins text-sm text-gray-700">
                          Build your reputation and portfolio
                        </span>
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-black text-white font-poppins text-sm font-medium rounded-[10px] hover:bg-gray-800 transition-colors">
                      Get Started as Freelancer
                    </button>
                  </div>
                </RoundedCard>
              </div>

              <p className="text-center font-poppins text-sm text-gray-600 mt-8">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="text-black font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </>
          ) : (
            <>
              {/* Signup Form */}
              <RoundedCard className="max-w-md mx-auto p-8">
                <button
                  onClick={() => setStep('role')}
                  className="font-poppins text-sm text-gray-600 hover:text-black mb-6"
                >
                  ← Back to role selection
                </button>

                <div className="text-center mb-8">
                  <h1 className="font-caveat text-3xl font-bold text-black mb-2">
                    Create Your Account
                  </h1>
                  <p className="font-poppins text-sm text-gray-600">
                    Sign up as a{' '}
                    <span className="font-medium text-black capitalize">
                      {selectedRole}
                    </span>
                  </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-black mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Juan Dela Cruz"
                      className={`w-full px-4 py-3 bg-[#F8F8F8] border rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors ${errors.name ? 'border-red-500' : 'border-[#EDEDED]'}`}
                    />
                    {errors.name && (
                      <p className="font-poppins text-xs text-red-500 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-black mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      placeholder="juan@example.com"
                      className={`w-full px-4 py-3 bg-[#F8F8F8] border rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors ${errors.email ? 'border-red-500' : 'border-[#EDEDED]'}`}
                    />
                    {errors.email && (
                      <p className="font-poppins text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-black mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 bg-[#F8F8F8] border rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors ${errors.password ? 'border-red-500' : 'border-[#EDEDED]'}`}
                    />
                    {errors.password && (
                      <p className="font-poppins text-xs text-red-500 mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block font-poppins text-sm font-medium text-black mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      className={`w-full px-4 py-3 bg-[#F8F8F8] border rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors ${errors.confirmPassword ? 'border-red-500' : 'border-[#EDEDED]'}`}
                    />
                    {errors.confirmPassword && (
                      <p className="font-poppins text-xs text-red-500 mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1 mr-2"
                    />
                    <label
                      htmlFor="terms"
                      className="font-poppins text-xs text-gray-600"
                    >
                      I agree to the{' '}
                      <a href="#" className="text-black hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-black hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-black text-white font-poppins text-sm font-medium rounded-[10px] hover:bg-gray-800 transition-colors"
                  >
                    Create Account
                  </button>
                </form>

                <p className="text-center font-poppins text-sm text-gray-600 mt-6">
                  Already have an account?{' '}
                  <a
                    href="/login"
                    className="text-black font-medium hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </RoundedCard>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
