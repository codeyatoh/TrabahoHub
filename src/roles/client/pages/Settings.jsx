import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { ConfirmationModal } from '../../../shared/components/ConfirmationModal'
import { Select } from '../../../shared/components/Select'
import { showToast } from '../../../shared/components/Toast'
import {
  FiUser,
  FiCreditCard,
  FiLock,
  FiBell,
  FiToggleLeft,
  FiToggleRight,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX
} from 'react-icons/fi'

export function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [paymentToDelete, setPaymentToDelete] = useState(null)
  const [profileSettings, setProfileSettings] = useState({
    fullName: 'Carlo Mendoza',
    email: 'carlo@email.com',
    phone: '+63 917 123 4567',
    location: 'Quezon City',
    company: 'Tech Startup Inc.',
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
  const [autoPaymentSettings, setAutoPaymentSettings] = useState({
    enableAutoPayment: true,
    autoFundProjects: false,
    autoApproveMilestones: false,
    paymentThreshold: '50000',
  })
  const [accountSettings, setAccountSettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    bidNotifications: true,
    messageNotifications: true,
    milestoneNotifications: true,
    paymentNotifications: true,
    weeklyDigest: true,
    marketingEmails: false,
  })
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
  const handleToggle = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    })
    showToast.success('Notification preference updated')
  }
  const handleAutoPaymentToggle = (key) => {
    if (typeof autoPaymentSettings[key] === 'boolean') {
      setAutoPaymentSettings({
        ...autoPaymentSettings,
        [key]: !autoPaymentSettings[key],
      })
      showToast.success('Auto-payment setting updated')
    }
  }
  const handleSetPrimary = (id) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isPrimary: method.id === id,
      })),
    )
    showToast.success('Primary payment method updated')
  }
  const handleDeletePayment = (id) => {
    setPaymentToDelete(id)
    setShowDeleteConfirm(true)
  }
  const confirmDeletePayment = () => {
    if (paymentToDelete) {
      setPaymentMethods(paymentMethods.filter((m) => m.id !== paymentToDelete))
      showToast.success('Payment method deleted')
      setShowDeleteConfirm(false)
      setPaymentToDelete(null)
    }
  }
  const handleSaveProfile = () => {
    showToast.success('Profile updated successfully!')
  }
  const handleUpdatePassword = () => {
    if (!accountSettings.currentPassword || !accountSettings.newPassword) {
      showToast.error('Please fill in all password fields')
      return
    }
    if (accountSettings.newPassword !== accountSettings.confirmPassword) {
      showToast.error('Passwords do not match')
      return
    }
    if (accountSettings.newPassword.length < 6) {
      showToast.error('Password must be at least 6 characters')
      return
    }
    showToast.success('Password updated successfully!')
    setAccountSettings({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    })
  }
  const sections = [
    {
      id: 'profile',
      label: 'Profile',
      icon: FiUser,
    },
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: FiCreditCard,
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
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Settings
            </h1>
            <p className="font-poppins text-gray-600">
              Manage your account settings and preferences
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
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={profileSettings.company}
                        onChange={(e) =>
                          setProfileSettings({
                            ...profileSettings,
                            company: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <button
                      onClick={handleSaveProfile}
                      className="w-full py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                    >
                      Save Profile Changes
                    </button>
                  </div>
                </RoundedCard>
              )}

              {/* Payment Methods */}
              {activeSection === 'payment' && (
                <div className="space-y-6">
                  <RoundedCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-caveat text-2xl font-bold text-black">
                          Payment Methods
                        </h2>
                        <p className="font-poppins text-sm text-gray-600">
                          Manage how you pay for projects
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
                    </div>
                  </RoundedCard>

                  {/* Auto-Payment Settings */}
                  <RoundedCard className="p-6">
                    <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                      Automatic Payment Settings
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                        <div>
                          <p className="font-poppins text-sm font-medium text-black">
                            Enable Auto-Payment
                          </p>
                          <p className="font-poppins text-xs text-gray-500">
                            Automatically process payments for approved work
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleAutoPaymentToggle('enableAutoPayment')
                          }
                          className="text-2xl"
                        >
                          {autoPaymentSettings.enableAutoPayment ? (
                            <FiToggleRight className="text-black" />
                          ) : (
                            <FiToggleLeft className="text-gray-400" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                        <div>
                          <p className="font-poppins text-sm font-medium text-black">
                            Auto-Fund Projects
                          </p>
                          <p className="font-poppins text-xs text-gray-500">
                            Automatically fund projects when hiring freelancers
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleAutoPaymentToggle('autoFundProjects')
                          }
                          className="text-2xl"
                        >
                          {autoPaymentSettings.autoFundProjects ? (
                            <FiToggleRight className="text-black" />
                          ) : (
                            <FiToggleLeft className="text-gray-400" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                        <div>
                          <p className="font-poppins text-sm font-medium text-black">
                            Auto-Approve Milestones
                          </p>
                          <p className="font-poppins text-xs text-gray-500">
                            Automatically approve and release milestone payments
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleAutoPaymentToggle('autoApproveMilestones')
                          }
                          className="text-2xl"
                        >
                          {autoPaymentSettings.autoApproveMilestones ? (
                            <FiToggleRight className="text-black" />
                          ) : (
                            <FiToggleLeft className="text-gray-400" />
                          )}
                        </button>
                      </div>

                      <div>
                        <label className="block font-poppins text-sm font-medium text-black mb-2">
                          Payment Threshold (PHP)
                        </label>
                        <p className="font-poppins text-xs text-gray-500 mb-2">
                          Maximum amount for auto-payment without confirmation
                        </p>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-poppins text-gray-500">
                            ₱
                          </span>
                          <input
                            type="number"
                            value={autoPaymentSettings.paymentThreshold}
                            onChange={(e) =>
                              setAutoPaymentSettings({
                                ...autoPaymentSettings,
                                paymentThreshold: e.target.value,
                              })
                            }
                            className="w-full pl-8 pr-4 py-3 bg-white border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                          />
                        </div>
                      </div>
                    </div>
                  </RoundedCard>
                </div>
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

                    <button
                      onClick={handleUpdatePassword}
                      className="w-full py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                    >
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
                          Bid Notifications
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Get notified when freelancers submit bids
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('bidNotifications')}
                        className="text-2xl"
                      >
                        {notificationSettings.bidNotifications ? (
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
                          Milestone Notifications
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Updates on milestone submissions and approvals
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('milestoneNotifications')}
                        className="text-2xl"
                      >
                        {notificationSettings.milestoneNotifications ? (
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
                  </div>
                </RoundedCard>
              )}
            </div>
          </div>
        </div>
      </main>

      <BottomNav role="client" />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeletePayment}
        title="Delete Payment Method"
        message="Are you sure you want to delete this payment method? This action cannot be undone."
        confirmText="Delete"
        type="danger"
      />

      {/* Add Payment Modal */}
      {showAddPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <RoundedCard className="w-full max-w-md">
            <div className="p-6">
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
                    placeholder="Carlo Mendoza"
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
                    onClick={() => {
                      setShowAddPayment(false)
                      showToast.success('Payment method added successfully!')
                    }}
                    className="flex-1 py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors"
                  >
                    Add Method
                  </button>
                </div>
              </div>
            </div>
          </RoundedCard>
        </div>
      )}
    </div>
  )
}

export default Settings;
