import React from 'react'
import { FaInfoCircle } from 'react-icons/fa'

interface IProps {
  children: any
  type?: 'info' | 'error' | 'success'
  className: string
}

const Pill = ({ children, className }: IProps) => {
  return (
    <div
      className={
        'border rounded p-3 shadow text-gray-600 flex ' + (className || '')
      }
    >
      <div>
        <FaInfoCircle className="text-xl mr-3 text-blue-800" />
      </div>
      <div>{children}</div>
    </div>
  )
}

export default Pill
