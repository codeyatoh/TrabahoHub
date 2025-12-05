import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { ChatList } from '../../../shared/components/ChatList'
import { ChatRoom } from '../../../shared/components/ChatRoom'

const mockConversations = [
  {
    id: '1',
    name: 'TechSolutions Inc.',
    lastMessage: 'When can you start?',
    time: '10:30 AM',
    unread: 1,
  },
  {
    id: '2',
    name: 'StartUp Hub',
    lastMessage: 'Payment released.',
    time: 'Yesterday',
    unread: 0,
  },
]

const mockMessages = {
  '1': [
    {
      id: '1',
      text: 'We liked your portfolio.',
      sender: 'other',
      time: '10:00 AM',
    },
    {
      id: '2',
      text: 'Thanks! I am interested in the project.',
      sender: 'me',
      time: '10:05 AM',
    },
    {
      id: '3',
      text: 'When can you start?',
      sender: 'other',
      time: '10:30 AM',
    },
  ],
  '2': [
    {
      id: '1',
      text: 'Payment released.',
      sender: 'other',
      time: 'Yesterday',
    },
  ],
}

export function FreelancerMessages() {
  const [activeId, setActiveId] = useState(null)
  const [conversations] = useState(mockConversations)
  const [messages, setMessages] = useState(mockMessages)

  const handleSend = (text) => {
    if (!activeId) return

    const newMsg = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }

    setMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), newMsg],
    }))
  }

  const activeConversation = conversations.find((c) => c.id === activeId)
  const currentMessages = activeId ? messages[activeId] || [] : []

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="freelancer" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="h-[calc(100vh-80px)] lg:h-screen flex">
          {/* Chat List - Hidden on mobile when conversation is active */}
          <div
            className={`
            w-full lg:w-80 bg-white border-r border-[#EDEDED]
            ${activeId ? 'hidden lg:block' : 'block'}
          `}
          >
            <ChatList
              conversations={conversations}
              activeId={activeId}
              onSelect={setActiveId}
            />
          </div>

          {/* Chat Room */}
          <div
            className={`
            flex-1 bg-white
            ${activeId ? 'block' : 'hidden lg:flex lg:items-center lg:justify-center'}
          `}
          >
            {activeId && activeConversation ? (
              <ChatRoom
                recipientName={activeConversation.name}
                messages={currentMessages}
                onSend={handleSend}
                onBack={() => setActiveId(null)}
              />
            ) : (
              <div className="text-center">
                <p className="font-poppins text-gray-500">
                  Select a conversation to start messaging
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav role="freelancer" />
    </div>
  )
}

export default FreelancerMessages;
