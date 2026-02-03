import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default class CategorySelector extends React.Component {
  render() {
    return (
      <div className="text-sm">
        <button className="px-5 py-1 rounded leading-loose bg-white border-gray-200 focus:outline-none focus:border-white text-black">
          <span>Eu sou...</span>
          <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
        </button>

        <div className="py-2 w-48 bg-white rounded-lg shadow-xl hidden">
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Aposentado
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Pensionista
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
          >
            Servidor Público
          </a>
        </div>
      </div>
    )
  }
}
