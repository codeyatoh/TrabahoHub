import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { RoundedCard } from '../../../shared/components/RoundedCard'
import {
  FiBell,
  FiCheckCircle,
  FiDollarSign,
  FiMessageSquare,
  FiBriefcase,
  FiCheck,
  FiTrash2,
  FiStar,
} from 'react-icons/fi'
const mockNotifications = [
  {
    id: '1',
    type: 'job',
    title: 'New Job Posted',
    message:
      'A new job matching your skills: "Build a sari-sari store inventory app"',
    time: '10 min ago',
    read: false,
    icon: FiBriefcase,
    iconColor: 'text-blue-500',
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'Carlo Mendoza sent you a message about the project requirements',
    time: '30 min ago',
    read: false,
    icon: FiMessageSquare,
    iconColor: 'text-green-500',
  },
  {
    id: '3',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received ₱25,000 for "E-commerce Website Development"',
    time: '2 hours ago',
    read: false,
    icon: FiDollarSign,
    iconColor: 'text-yellow-500',
  },
  {
    id: '4',
    type: 'job',
    title: 'Bid Accepted',
    message: 'Your bid for "Logo Design for Coffee Shop" was accepted!',
    time: '5 hours ago',
    read: true,
    icon: FiCheckCircle,
    iconColor: 'text-green-500',
  },
  {
    id: '5',
    type: 'system',
    title: 'New Review',
    message: 'Rina Villanueva left you a 5-star review',
    time: '1 day ago',
    read: true,
    icon: FiStar,
    iconColor: 'text-yellow-500',
  },
  {
    id: '6',
    type: 'job',
    title: 'Job Completed',
    message: 'Client marked "Social Media Management" as completed',
    time: '2 days ago',
    read: true,
    icon: FiCheckCircle,
    iconColor: 'text-green-500',
  },
]
export function Notifications() {
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState(mockNotifications)
  const filteredNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((n) => n.type === filter)
  const unreadCount = notifications.filter((n) => !n.read).length
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id
          ? {
              ...n,
              read: true,
            }
          : n,
      ),
    )
  }
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        read: true,
      })),
    )
  }
  const deleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-caveat text-4xl font-bold text-black mb-1">
                Notifications
              </h1>
              <p className="font-poppins text-gray-600">
                {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="inline-flex items-center px-4 py-2 bg-[#F8F8F8] text-black font-poppins text-sm rounded-[10px] border border-[#EDEDED] hover:bg-[#EDEDED] transition-colors"
              >
                <FiCheck className="w-4 h-4 mr-2" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {(
              [
                'all',
                'jobs',
                'messages',
                'payments',
                'system',
              ]
            ).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-[10px] font-poppins text-sm capitalize whitespace-nowrap transition-colors ${filter === type ? 'bg-black text-white' : 'bg-white text-gray-600 border border-[#EDEDED] hover:bg-[#F8F8F8]'}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.map((notification) => (
              <RoundedCard
                key={notification.id}
                className={`p-4 transition-all ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center flex-shrink-0 ${notification.iconColor}`}
                  >
                    <notification.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-poppins text-sm font-medium text-black">
                          {notification.title}
                        </h3>
                        <p className="font-poppins text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="font-poppins text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-black transition-colors"
                            title="Mark as read"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </RoundedCard>
            ))}
          </div>

          {filteredNotifications.length === 0 && (
            <RoundedCard className="p-12 text-center">
              <FiBell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="font-poppins text-gray-500">
                No notifications found
              </p>
            </RoundedCard>
          )}
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  )
}

export default Notifications;
