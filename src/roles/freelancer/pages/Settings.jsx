import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiUser,
  FiBriefcase,
  FiDollarSign,
  FiLock,
  FiBell,
  FiToggleLeft,
  FiToggleRight,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
} from 'react-icons/fi'
import { Select } from '../../../shared/components/Select'
export function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [editingPayment, setEditingPayment] = useState(null)
  const [profileSettings, setProfileSettings] = useState({
    fullName: 'Maria Santos',
    email: 'maria@email.com',
    phone: '+63 917 123 4567',
    location: 'Cebu City',
    bio: 'Experienced full-stack developer specializing in React, Node.js, and mobile development.',
    website: 'https://mariasantos.dev',
  })
  const [professionalSettings, setProfessionalSettings] = useState({
    title: 'Full-Stack Developer',
    hourlyRate: '500',
    availability: 'full-time',
    skills: 'React, Node.js, TypeScript, React Native, Firebase, MongoDB',
    experience: '5',
    languages: 'English, Filipino',
  })
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: '1',
      type: 'gcash',
      name: 'GCash',
      details: '0917-123-4567',
      isPrimary: true,
    },
    {
      id: '2',
      type: 'bank',
      name: 'BDO',
      details: '1234-5678-9012',
      isPrimary: false,
    },
  ])
  const [accountSettings, setAccountSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    messageNotifications: true,
    bidUpdates: true,
    paymentNotifications: true,
    weeklyDigest: false,
    marketingEmails: false,
  })
  const handleToggle = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    })
  }
  const handleSetPrimary = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isPrimary: method.id === id,
      })),
    )
  }
  const handleDeletePayment = (id) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }
  const sections = [
    {
      id: 'profile',
      label: 'Profile',
      icon: FiUser,
    },
    {
      id: 'professional',
      label: 'Professional',
      icon: FiBriefcase,
    },
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: FiDollarSign,
    },
    {
      id: 'account',
      label: 'Account',
      icon: FiLock,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: FiBell,
    },
  ]
  const paymentIcons = {
    gcash: '💳',
    maya: '💰',
    bank: '🏦',
    paypal: '💵',
  }
  const paymentTypeOptions = [
    {
      value: 'gcash',
      label: 'GCash',
    },
    {
      value: 'maya',
      label: 'Maya',
    },
    {
      value: 'bank',
      label: 'Bank Transfer',
    },
    {
      value: 'paypal',
      label: 'PayPal',
    },
  ]
  const availabilityOptions = [
    {
      value: 'full-time',
      label: 'Full-time',
    },
    {
      value: 'part-time',
      label: 'Part-time',
    },
    {
      value: 'contract',
      label: 'Contract',
    },
    {
      value: 'not-available',
      label: 'Not Available',
    },
  ]
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Settings
            </h1>
            <p className="font-poppins text-gray-600">
              Manage your profile, payment methods, and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <RoundedCard className="p-4">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-[10px] transition-all ${activeSection === section.id ? 'bg-black text-white' : 'text-gray-600 hover:bg-[#F8F8F8]'}`}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="font-poppins text-sm">
                        {section.label}
                      </span>
                    </button>
                  ))}
                </nav>
              </RoundedCard>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {/* Profile Settings */}
              {activeSection === 'profile' && (
                <RoundedCard className="p-6">
                  <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                    Profile Information
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-poppins text-sm font-medium text-black mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileSettings.fullName}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block font-poppins text-sm font-medium text-black mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileSettings.email}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-poppins text-sm font-medium text-black mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileSettings.phone}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block font-poppins text-sm font-medium text-black mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={profileSettings.location}
                          onChange={(e) =>
                            setProfileSettings({
                              ...profileSettings,
                              location: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Bio
                      </label>
                      <textarea
                        rows={4}
                        value={profileSettings.bio}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            bio: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Website / Portfolio
                      </label>
                      <input
                        type="url"
                        value={profileSettings.website}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            website: e.target.value,
                          })
                        }
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <button className="w-full py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors">
                      Save Profile Changes
                    </button>
                  </div>
                </RoundedCard>
              )}

              {/* Professional Settings */}
              {activeSection === 'professional' && (
                <RoundedCard className="p-6">
                  <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                    Professional Information
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Professional Title
                      </label>
                      <input
                        type="text"
                        value={professionalSettings.title}
                        onChange={(e) =>
                          setProfessionalSettings({
                            ...professionalSettings,
                            title: e.target.value,
                          })
                        }
                        placeholder="e.g., Full-Stack Developer"
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-poppins text-sm font-medium text-black mb-2">
                          Hourly Rate (PHP)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-poppins text-gray-500">
                            ₱
                          </span>
                          <input
                            type="number"
                            value={professionalSettings.hourlyRate}
                            onChange={(e) =>
                              setProfessionalSettings({
                                ...professionalSettings,
                                hourlyRate: e.target.value,
                              })
                            }
                            className="w-full pl-8 pr-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>

                      <Select
                        label="Availability"
                        value={professionalSettings.availability}
                        onChange={(value) =>
                          setProfessionalSettings({
                            ...professionalSettings,
                            availability: value,
                          })
                        }
                        options={availabilityOptions}
                      />
                    </div>

                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Skills (comma separated)
                      </label>
                      <input
                        type="text"
                        value={professionalSettings.skills}
                        onChange={(e) =>
                          setProfessionalSettings({
                            ...professionalSettings,
                            skills: e.target.value,
                          })
                        }
                        placeholder="React, Node.js, TypeScript"
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-poppins text-sm font-medium text-black mb-2">
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          value={professionalSettings.experience}
                          onChange={(e) =>
                            setProfessionalSettings({
                              ...professionalSettings,
                              experience: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                      <div>
                        <label className="block font-poppins text-sm font-medium text-black mb-2">
                          Languages
                        </label>
                        <input
                          type="text"
                          value={professionalSettings.languages}
                          onChange={(e) =>
                            setProfessionalSettings({
                              ...professionalSettings,
                              languages: e.target.value,
                            })
                          }
                          placeholder="English, Filipino"
                          className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <button className="w-full py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors">
                      Save Professional Settings
                    </button>
                  </div>
                </RoundedCard>
              )}

              {/* Payment Methods */}
              {activeSection === 'payment' && (
                <RoundedCard className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-caveat text-2xl font-bold text-black">
                        Payment Methods
                      </h2>
                      <p className="font-poppins text-sm text-gray-600">
                        Manage how you receive payments
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddPayment(true)}
                      className="inline-flex items-center px-4 py-2 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                    >
                      <FiPlus className="w-4 h-4 mr-2" />
                      Add Method
                    </button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="p-4 bg-[#F8F8F8] rounded-[10px] border border-[#EDEDED]"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-3xl">
                              {paymentIcons[method.type]}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-poppins text-sm font-medium text-black">
                                  {method.name}
                                </p>
                                {method.isPrimary && (
                                  <span className="px-2 py-1 bg-black text-white rounded-[6px] font-poppins text-xs">
                                    Primary
                                  </span>
                                )}
                              </div>
                              <p className="font-poppins text-sm text-gray-600">
                                {method.details}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {!method.isPrimary && (
                              <button
                                onClick={() => handleSetPrimary(method.id)}
                                className="p-2 text-gray-600 hover:text-black transition-colors"
                                title="Set as primary"
                              >
                                <FiCheck className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => setEditingPayment(method)}
                              className="p-2 text-gray-600 hover:text-black transition-colors"
                              title="Edit"
                            >
                              <FiEdit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePayment(method.id)}
                              className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {paymentMethods.length === 0 && (
                      <div className="text-center py-12">
                        <FiDollarSign className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="font-poppins text-gray-500">
                          No payment methods added yet
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Add Payment Method Modal */}
                  {showAddPayment && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-[12px] w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="font-caveat text-2xl font-bold text-black">
                            Add Payment Method
                          </h3>
                          <button
                            onClick={() => setShowAddPayment(false)}
                            className="p-2 hover:bg-[#F8F8F8] rounded-full"
                          >
                            <FiX className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <Select
                            label="Payment Type"
                            value=""
                            onChange={() => {}}
                            options={paymentTypeOptions}
                          />

                          <div>
                            <label className="block font-poppins text-sm font-medium text-black mb-2">
                              Account Name
                            </label>
                            <input
                              type="text"
                              placeholder="Maria Santos"
                              className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                            />
                          </div>

                          <div>
                            <label className="block font-poppins text-sm font-medium text-black mb-2">
                              Account Number / Details
                            </label>
                            <input
                              type="text"
                              placeholder="0917-123-4567"
                              className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <button
                              onClick={() => setShowAddPayment(false)}
                              className="flex-1 py-3 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setShowAddPayment(false)}
                              className="flex-1 py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                            >
                              Add Method
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </RoundedCard>
              )}

              {/* Account Settings */}
              {activeSection === 'account' && (
                <RoundedCard className="p-6">
                  <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                    Account Security
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={accountSettings.currentPassword}
                        onChange={(e) =>
                          setAccountSettings({
                            ...accountSettings,
                            currentPassword: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={accountSettings.newPassword}
                        onChange={(e) =>
                          setAccountSettings({
                            ...accountSettings,
                            newPassword: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={accountSettings.confirmPassword}
                        onChange={(e) =>
                          setAccountSettings({
                            ...accountSettings,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <button className="w-full py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors">
                      Update Password
                    </button>

                    <div className="pt-6 border-t border-[#EDEDED]">
                      <h3 className="font-poppins text-sm font-medium text-black mb-4">
                        Danger Zone
                      </h3>
                      <button className="w-full py-3 bg-red-50 text-red-600 font-poppins text-sm rounded-[10px] border border-red-200 hover:bg-red-100 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </RoundedCard>
              )}

              {/* Notification Settings */}
              {activeSection === 'notifications' && (
                <RoundedCard className="p-6">
                  <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                    Notification Preferences
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Email Notifications
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Receive important updates via email
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('emailNotifications')}
                        className="text-2xl"
                      >
                        {notificationSettings.emailNotifications ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Job Alerts
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Get notified about new jobs matching your skills
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('jobAlerts')}
                        className="text-2xl"
                      >
                        {notificationSettings.jobAlerts ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Message Notifications
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Get notified when you receive new messages
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('messageNotifications')}
                        className="text-2xl"
                      >
                        {notificationSettings.messageNotifications ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Bid Updates
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Updates on your job bids and proposals
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('bidUpdates')}
                        className="text-2xl"
                      >
                        {notificationSettings.bidUpdates ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Payment Notifications
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Get notified about payments and transactions
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('paymentNotifications')}
                        className="text-2xl"
                      >
                        {notificationSettings.paymentNotifications ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Weekly Digest
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Weekly summary of your activity
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('weeklyDigest')}
                        className="text-2xl"
                      >
                        {notificationSettings.weeklyDigest ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Marketing Emails
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Tips, news, and promotional content
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('marketingEmails')}
                        className="text-2xl"
                      >
                        {notificationSettings.marketingEmails ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <button className="w-full py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors mt-6">
                      Save Notification Preferences
                    </button>
                  </div>
                </RoundedCard>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  )
}

export default Settings;
