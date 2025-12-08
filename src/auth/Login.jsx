import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RoundedCard } from '../shared/components/RoundedCard'
import { FiMail, FiLock, FiEye, FiEyeOff, FiInfo } from 'react-icons/fi'
import { FaFacebook, FaGoogle } from 'react-icons/fa'
import { useUser } from '../context/UserContext'
import { toast } from 'react-toastify'

export function Login() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Attempt login
    const user = login(formData.email, formData.password)
    
    if (user) {
      toast.success('Login successful!')
      
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard')
          break
        case 'freelancer':
          navigate('/freelancer/dashboard')
          break
        case 'client':
          navigate('/client/dashboard')
          break
        default:
          navigate('/')
      }
    } else {
      toast.error('Invalid email or password')
    }
  }

  const handleSocialLogin = (provider) => {
    // Mock social login - in production, this would integrate with OAuth
    console.log(`Logging in with ${provider}`)
    // Default to client dashboard for social login
    navigate('/client/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex flex-col">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Link 
          to="/" 
          className="inline-flex items-center text-sm font-poppins font-medium text-gray-600 hover:text-black transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Landing Page
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <RoundedCard className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Welcome Back!
            </h1>
            <p className="font-poppins text-sm text-gray-600">
              Sign in to continue to TrabahoHub
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-poppins text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                  className="w-full pl-12 pr-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-poppins text-sm text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="#"
                className="font-poppins text-sm text-gray-600 hover:text-black"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-black text-white font-poppins text-sm font-medium rounded-[10px] hover:bg-gray-800 transition-colors"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#EDEDED]"></div>
            <span className="px-4 font-poppins text-xs text-gray-400">
              or continue with
            </span>
            <div className="flex-1 border-t border-[#EDEDED]"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full py-3 bg-white border border-[#EDEDED] rounded-[10px] font-poppins text-sm font-medium text-gray-700 hover:bg-[#F8F8F8] transition-colors flex items-center justify-center space-x-2"
            >
              <FaGoogle className="w-5 h-5 text-[#DB4437]" />
              <span>Continue with Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="w-full py-3 bg-[#1877F2] rounded-[10px] font-poppins text-sm font-medium text-white hover:bg-[#166FE5] transition-colors flex items-center justify-center space-x-2"
            >
              <FaFacebook className="w-5 h-5" />
              <span>Continue with Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center font-poppins text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link
              to="/role-select"
              className="text-black font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </RoundedCard>

        {/* Demo Credentials Helper */}

      </div>
    </div>
  )
}
