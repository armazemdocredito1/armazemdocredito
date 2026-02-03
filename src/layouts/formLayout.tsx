import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FloatingWhatsApp } from 'react-floating-whatsapp-button'
import 'react-floating-whatsapp-button/dist/index.css'

import Navigation from '../components/navigation-simple'
import './styles.css'

export const FormLayout = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={className}>
      <Navigation {...rest} />

      {children}
    </div>
  )
}

export default FormLayout
