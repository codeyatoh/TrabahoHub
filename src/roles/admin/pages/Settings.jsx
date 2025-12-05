import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import { Select } from '../../../shared/components/Select'
import {
  FiSettings,
  FiShield,
  FiBell,
  FiDatabase,
  FiToggleLeft,
  FiToggleRight,
} from 'react-icons/fi'

export function Settings() {
  const [activeSection, setActiveSection] = useState('general')
  const [settings, setSettings] = useState({
    siteName: 'TrabahoHub',
    siteDescription: 'Filipino Freelance Marketplace',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    twoFactorAuth: false,
    emailNotifications: true,
    systemAlerts: true,
    weeklyReports: true,
    autoBackup: true,
    backupFrequency: 'daily',
  })

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    })
  }

  const sections = [
    {
      id: 'general',
      label: 'General',
      icon: FiSettings,
    },
    {
      id: 'security',
      label: 'Security',
      icon: FiShield,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: FiBell,
    },
    {
      id: 'platform',
      label: 'Platform',
      icon: FiDatabase,
    },
  ]

  const backupFrequencyOptions = [
    {
      value: 'hourly',
      label: 'Hourly',
    },
    {
      value: 'daily',
      label: 'Daily',
    },
    {
      value: 'weekly',
      label: 'Weekly',
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="admin" />

      <main className="flex-1 lg:ml-0">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-caveat text-4xl font-bold text-black mb-2">
              Settings
            </h1>
            <p className="font-poppins text-gray-600">
              Manage platform configuration and preferences
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
              {activeSection === 'general' && (
                <RoundedCard className="p-6">
                  <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                    General Settings
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Site Name
                      </label>
                      <input
                        type="text"
                        value={settings.siteName}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            siteName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="block font-poppins text-sm font-medium text-black mb-2">
                        Site Description
                      </label>
                      <textarea
                        rows={3}
                        value={settings.siteDescription}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            siteDescription: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-[#F8F8F8] border border-[#EDEDED] rounded-[10px] font-poppins text-sm focus:outline-none focus:border-black resize-none"
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Maintenance Mode
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Temporarily disable the platform
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('maintenanceMode')}
                        className="text-2xl"
                      >
                        {settings.maintenanceMode ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Allow Registration
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Enable new user signups
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('allowRegistration')}
                        className="text-2xl"
                      >
                        {settings.allowRegistration ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </RoundedCard>
              )}

              {activeSection === 'security' && (
                <RoundedCard className="p-6">
                  <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                    Security Settings
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Require Email Verification
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Users must verify email before accessing platform
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('requireEmailVerification')}
                        className="text-2xl"
                      >
                        {settings.requireEmailVerification ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Two-Factor Authentication
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Require 2FA for admin accounts
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('twoFactorAuth')}
                        className="text-2xl"
                      >
                        {settings.twoFactorAuth ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </RoundedCard>
              )}

              {activeSection === 'notifications' && (
                <RoundedCard className="p-6">
                  <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                    Notification Settings
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
                        {settings.emailNotifications ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          System Alerts
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Critical system notifications
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('systemAlerts')}
                        className="text-2xl"
                      >
                        {settings.systemAlerts ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Weekly Reports
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Platform analytics summary
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('weeklyReports')}
                        className="text-2xl"
                      >
                        {settings.weeklyReports ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </RoundedCard>
              )}

              {activeSection === 'platform' && (
                <RoundedCard className="p-6">
                  <h2 className="font-caveat text-2xl font-bold text-black mb-6">
                    Platform Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-[#F8F8F8] rounded-[10px]">
                      <div>
                        <p className="font-poppins text-sm font-medium text-black">
                          Auto Backup
                        </p>
                        <p className="font-poppins text-xs text-gray-500">
                          Automatic database backups
                        </p>
                      </div>
                      <button
                        onClick={() => handleToggle('autoBackup')}
                        className="text-2xl"
                      >
                        {settings.autoBackup ? (
                          <FiToggleRight className="text-black" />
                        ) : (
                          <FiToggleLeft className="text-gray-400" />
                        )}
                      </button>
                    </div>

                    <Select
                      label="Backup Frequency"
                      value={settings.backupFrequency}
                      onChange={(value) =>
                        setSettings({
                          ...settings,
                          backupFrequency: value,
                        })
                      }
                      options={backupFrequencyOptions}
                    />
                  </div>
                </RoundedCard>
              )}

              {/* Save Button */}
              <div className="mt-6">
                <button className="w-full py-3 bg-black text-white font-poppins text-sm rounded-[10px] hover:bg-gray-800 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
