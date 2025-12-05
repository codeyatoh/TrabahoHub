import React from 'react'
import { RoundedCard } from './RoundedCard'
import PropTypes from 'prop-types'

export function IconCard({ icon, title, description, onClick }) {
  return (
    <RoundedCard hover onClick={onClick} className="p-6">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-caveat text-xl font-semibold text-black mb-1">
        {title}
      </h3>
      {description && (
        <p className="font-poppins text-sm text-gray-600">{description}</p>
      )}
    </RoundedCard>
  )
}

IconCard.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
}
