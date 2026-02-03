import React from 'react'

const StatusBar = ({ percentage }) => {
  return (
    <div className="bg-gray-300 h-1">
      <div
        className="h-full transition-all"
        style={{ width: `${percentage}%`, backgroundColor: '#eea12e' }}
      ></div>
    </div>
  )
}

export default StatusBar
