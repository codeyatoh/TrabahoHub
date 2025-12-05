import React, { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import PropTypes from 'prop-types'

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  label,
  error,
}) {
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block font-poppins text-sm font-medium text-black mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            setIsFocused(true)
            setIsOpen(true)
          }}
          onBlur={() => {
            setIsFocused(false)
            setIsOpen(false)
          }}
          disabled={disabled}
          className={`
            w-full px-4 py-3 pr-10
            bg-white border rounded-[10px]
            font-poppins text-sm
            appearance-none cursor-pointer
            transition-all duration-300 ease-out
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : isFocused ? 'border-black shadow-lg ring-4 ring-black/5' : 'border-[#EDEDED] hover:border-gray-400 hover:shadow-md'}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-[#F8F8F8]' : ''}
            focus:outline-none
            transform hover:scale-[1.01]
          `}
          style={{
            backgroundImage: 'none',
          }}
        >
          {placeholder && (
            <option value="" disabled className="text-gray-400">
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="py-3 px-4 hover:bg-[#F8F8F8] transition-colors duration-200"
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <FiChevronDown
            className={`
              w-5 h-5 transition-all duration-300 ease-out
              ${disabled ? 'text-gray-400' : isFocused ? 'text-black' : 'text-gray-600'}
              ${isOpen ? 'rotate-180' : 'rotate-0'}
            `}
          />
        </div>

        {isFocused && !error && (
          <div className="absolute inset-0 rounded-[10px] ring-4 ring-black/5 pointer-events-none transition-opacity duration-300 ease-out" />
        )}
      </div>

      {error && (
        <p className="font-poppins text-xs text-red-500 mt-1 animate-fadeIn">
          {error}
        </p>
      )}
    </div>
  )
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
}
