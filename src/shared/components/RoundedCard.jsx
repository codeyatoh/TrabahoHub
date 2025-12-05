import React from 'react'
import PropTypes from 'prop-types'

export function RoundedCard({
  children,
  className = '',
  hover = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-[12px] border border-[#EDEDED]
        ${hover ? 'transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

RoundedCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool,
  onClick: PropTypes.func,
}
