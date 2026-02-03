import PropTypes from 'prop-types'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import classNames from 'classnames/bind'
import { gtagReportConversion } from '../utils/google-tracking'

import * as style from './navigation.module.css'

const cx = classNames.bind(style)

export default class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isWhatsappOn: false,
      isMenuOpen: false,
    }
  }

  showWhatsapp = () => {
    this.setState(() => ({
      isWhatsappOn: true,
    }))
    gtagReportConversion(this.props.contato.whatsappLink)
  }

  toggleMenu = () => {
    this.setState(() => ({
      isMenuOpen: !this.state.isMenuOpen,
    }))
  }

  render() {
    const contato = this.props.contato || {}
    const linkStyle = 'text-wild-orange font-bold block mt-4 md:inline-block lg:mt-0 hover:text-blue-500 mr-6'

    const menu = this.props.menu.map((item, index) => (
      <a href={`#${item.link}`} className={linkStyle} key={index}>
        {item.label}
      </a>
    ))

    return (
      <div className="border-b max-w-screen-xl m-auto">
        <nav className="px-6" style={{ minHeight: 'var(--navbar-height)' }}>
          <div className="flex items-center justify-between flex-wrap py-6 text-gray-700 my-0 mx-auto">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <img
                src={this.props.logo}
                className={cx({
                  navbarImg: !this.props.logo_large,
                  navbarImgLarge: this.props.logo_large,
                })}
                alt="BMG Card"
              />
            </div>

            <div className="block lg:hidden">
              <button
                className="flex items-center px-3 py-2 border rounded border-teal-400 hover:border-teal-600"
                onClick={this.toggleMenu}
              >
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              </button>
            </div>

            <div
              className={
                'w-full flex-grow flex-col sm:flex-row lg:flex-row lg:flex lg:items-center lg:w-auto lg:block ' +
                (this.state.isMenuOpen ? 'block' : 'hidden')
              }
            >
              <div className="lg:flex-grow">{menu}</div>
              <div className="mt-4 lg:m-0">
                <a
                  href={`tel:${contato.telefone}`}
                  className="text-black inline-block pr-4 py-2 leading-none align-middle"
                >
                  Ligue {contato.telefone}
                </a>

                <a
                  href={this.props.contato.whatsappLink}
                  className="inline-block px-4 py-2 leading-none rounded bg-whatsapp-green text-white rounded-full cursor-pointer"
                  onClick={this.showWhatsapp}
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className={style.icon} />
                  <span className="align-middle ml-2">
                    {this.state.isWhatsappOn ? contato.whatsapp : 'WhatsApp'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

Navigation.propTypes = {
  contato: PropTypes.shape({
    telefone: PropTypes.string.isRequired,
    whatsapp: PropTypes.string.isRequired,
    whatsappLink: PropTypes.string,
  }).isRequired,
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  logo: PropTypes.string,
  logo_large: PropTypes.bool,
}
