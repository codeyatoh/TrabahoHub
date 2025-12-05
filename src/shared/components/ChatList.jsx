import React from 'react'
import PropTypes from 'prop-types'

export function ChatList({ conversations, activeId, onSelect }) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#EDEDED]">
        <h2 className="font-caveat text-2xl font-bold text-black">Messages</h2>
      </div>

      {/* Search */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full px-4 py-2 bg-[#F8F8F8] rounded-[10px] border border-[#EDEDED] font-poppins text-sm focus:outline-none focus:border-black transition-colors"
        />
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
        {conversations.map((convo) => (
          <div
            key={convo.id}
            onClick={() => onSelect(convo.id)}
            className={`
              p-4 rounded-[12px] cursor-pointer transition-all
              ${activeId === convo.id ? 'bg-black text-white' : 'bg-white border border-[#EDEDED] hover:border-black'}
            `}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center font-caveat text-lg
                ${activeId === convo.id ? 'bg-white text-black' : 'bg-[#F8F8F8] text-black'}
              `}
              >
                {convo.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p
                    className={`font-poppins text-sm font-medium truncate ${activeId === convo.id ? 'text-white' : 'text-black'}`}
                  >
                    {convo.name}
                  </p>
                  <span
                    className={`font-poppins text-xs ${activeId === convo.id ? 'text-gray-300' : 'text-gray-400'}`}
                  >
                    {convo.time}
                  </span>
                </div>
                <p
                  className={`font-poppins text-xs truncate ${activeId === convo.id ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {convo.lastMessage}
                </p>
              </div>
              {convo.unread > 0 && activeId !== convo.id && (
                <span className="w-5 h-5 bg-black text-white rounded-full flex items-center justify-center font-poppins text-xs">
                  {convo.unread}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

ChatList.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lastMessage: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      unread: PropTypes.number.isRequired,
      avatar: PropTypes.string,
    })
  ).isRequired,
  activeId: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
}
