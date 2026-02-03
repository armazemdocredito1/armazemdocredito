import React, { useEffect, useState } from 'react'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { FloatingWhatsApp } from 'react-floating-whatsapp-button'
import 'react-floating-whatsapp-button/dist/index.css'

import Navigation from '../components/navigation'
import './styles.css'

export const Layout = ({ children, contato, logo, logo_large, menu }) => {
  let [WhatsappButton, setWhatsappButton] = useState(null)

  useEffect(() => {
    const whatsappPhone =
      new URLSearchParams(new URL(contato.whatsappLink).search).get('phone') ||
      ''

    setWhatsappButton(
      <FloatingWhatsApp
        popupMessage="Olá, em que podemos ajudar?"
        autoOpenTimeout="3000"
        phone={whatsappPhone}
      />
    )
  }, [])

  return (
    <div>
      <Navigation
        contato={contato}
        logo={logo}
        logo_large={logo_large}
        menu={menu}
      />

      {children}

      {WhatsappButton}
    </div>
  )
}

export default Layout
