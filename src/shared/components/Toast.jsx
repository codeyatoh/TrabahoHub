import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiCheckCircle, FiXCircle, FiAlertCircle, FiInfo } from 'react-icons/fi'
import PropTypes from 'prop-types'

const defaultOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
}

export const showToast = {
  success: (message, options) => {
    toast.success(message, {
      ...defaultOptions,
      ...options,
      icon: <FiCheckCircle className="w-5 h-5" />,
    })
  },
  error: (message, options) => {
    toast.error(message, {
      ...defaultOptions,
      ...options,
      icon: <FiXCircle className="w-5 h-5" />,
    })
  },
  warning: (message, options) => {
    toast.warning(message, {
      ...defaultOptions,
      ...options,
      icon: <FiAlertCircle className="w-5 h-5" />,
    })
  },
  info: (message, options) => {
    toast.info(message, {
      ...defaultOptions,
      ...options,
      icon: <FiInfo className="w-5 h-5" />,
    })
  },
}

export function ToastProvider() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      style={{
        fontFamily: 'Poppins, sans-serif',
      }}
      toastStyle={{
        borderRadius: '10px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}
    />
  )
}
