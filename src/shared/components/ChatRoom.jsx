import React, { useState } from 'react'
import { FiSend, FiPaperclip, FiSmile, FiArrowLeft } from 'react-icons/fi'
import PropTypes from 'prop-types'

export function ChatRoom({
  recipientName,
  messages,
  onSend,
  onBack,
}) {
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (newMessage.trim()) {
      onSend(newMessage)
      setNewMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-[#EDEDED] flex items-center space-x-4">
        {onBack && (
          <button
            onClick={onBack}
            className="lg:hidden p-2 text-gray-600 hover:text-black"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div className="w-10 h-10 bg-[#F8F8F8] rounded-full flex items-center justify-center font-caveat text-lg">
          {recipientName.charAt(0)}
        </div>
        <div>
          <p className="font-poppins text-sm font-medium text-black">
            {recipientName}
          </p>
          <p className="font-poppins text-xs text-green-500">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`
                max-w-[70%] px-4 py-3 rounded-[12px]
                ${msg.sender === 'me' ? 'bg-black text-white rounded-br-none' : 'bg-white border border-[#EDEDED] text-black rounded-bl-none'}
              `}
            >
              <p className="font-poppins text-sm">{msg.text}</p>
              <p
                className={`font-poppins text-xs mt-1 ${msg.sender === 'me' ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[#EDEDED]">
        <div className="flex items-center space-x-3 bg-[#F8F8F8] rounded-[12px] px-4 py-2">
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <FiPaperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent font-poppins text-sm focus:outline-none"
          />
          <button className="p-2 text-gray-500 hover:text-black transition-colors">
            <FiSmile className="w-5 h-5" />
          </button>
          <button
            onClick={handleSend}
            className="p-2 bg-black text-white rounded-[10px] hover:bg-gray-800 transition-colors"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

ChatRoom.propTypes = {
  recipientName: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      sender: PropTypes.oneOf(['me', 'other']).isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSend: PropTypes.func.isRequired,
  onBack: PropTypes.func,
}
