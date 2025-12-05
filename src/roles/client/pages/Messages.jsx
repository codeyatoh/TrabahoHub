import React, { useState } from 'react'
import { Sidebar } from '../../../shared/components/Sidebar'
import { BottomNav } from '../../../shared/components/BottomNav'
import { ChatList } from '../../../shared/components/ChatList'
import { ChatRoom } from '../../../shared/components/ChatRoom'
const mockConversations = [
  {
    id: '1',
    name: 'Maria Santos',
    lastMessage: "I'll send the first draft tomorrow",
    time: '2m ago',
    unread: 2,
  },
  {
    id: '2',
    name: 'Juan Reyes',
    lastMessage: 'The payment has been received. Salamat!',
    time: '1h ago',
    unread: 0,
  },
  {
    id: '3',
    name: 'Ana Garcia',
    lastMessage: 'Can we schedule a call?',
    time: '3h ago',
    unread: 1,
  },
]
const mockMessages = [
  {
    id: '1',
    text: 'Hi! I saw your job posting for the e-commerce website.',
    sender: 'other',
    time: '10:30 AM',
  },
  {
    id: '2',
    text: 'Yes, are you interested in the project?',
    sender: 'me',
    time: '10:32 AM',
  },
  {
    id: '3',
    text: 'Absolutely! I have experience with similar projects. I can integrate GCash and Maya payments.',
    sender: 'other',
    time: '10:35 AM',
  },
  {
    id: '4',
    text: 'That sounds great. Can you share your portfolio?',
    sender: 'me',
    time: '10:38 AM',
  },
  {
    id: '5',
    text: "I'll send the first draft tomorrow",
    sender: 'other',
    time: '10:40 AM',
  },
]
export function Messages() {
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState(mockMessages)
  const handleSend = (text) => {
    const newMessage = {
      id: String(messages.length + 1),
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    setMessages([...messages, newMessage])
  }
  const activeConvo = mockConversations.find((c) => c.id === activeConversation)
  return (
    <div className="min-h-screen bg-[#F8F8F8] flex">
      <Sidebar role="client" />

      <main className="flex-1 lg:ml-0 pb-20 lg:pb-0">
        <div className="h-[calc(100vh-80px)] lg:h-screen flex">
          {/* Chat List - Hidden on mobile when conversation is active */}
          <div
            className={`
            w-full lg:w-80 bg-white border-r border-[#EDEDED]
            ${activeConversation ? 'hidden lg:block' : 'block'}
          `}
          >
            <ChatList
              conversations={mockConversations}
              activeId={activeConversation || undefined}
              onSelect={setActiveConversation}
            />
          </div>

          {/* Chat Room */}
          <div
            className={`
            flex-1 bg-white
            ${activeConversation ? 'block' : 'hidden lg:flex lg:items-center lg:justify-center'}
          `}
          >
            {activeConversation && activeConvo ? (
              <ChatRoom
                recipientName={activeConvo.name}
                messages={messages}
                onSend={handleSend}
                onBack={() => setActiveConversation(null)}
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

      <BottomNav role="client" />
    </div>
  )
}

export default Messages;
