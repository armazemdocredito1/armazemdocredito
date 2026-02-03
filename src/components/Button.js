import React from 'react'
import PropTypes from 'prop-types'
import { gtagReportConversion } from '../utils/google-tracking'

export const Button = ({ style, children, href, className, noBtn }) => {
  let onClick = () => {}
  if (!href.startsWith('#')) {
    onClick = () => gtagReportConversion(href)
  }

  return (
    <a
      className={(noBtn ? '' : `btn btn-${style} `) + className}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

Button.propTypes = {
  style: PropTypes.string,
  children: PropTypes.any,
  href: PropTypes.string,
}
