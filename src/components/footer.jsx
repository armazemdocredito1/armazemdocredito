import React from 'react'
import PropTypes from 'prop-types'
import { gtagReportConversion } from '../utils/google-tracking'

export const Footer = (props) => {
  return (
    <div className="border-t px-5 p-margin">
      <div className="max-w-screen-lg 2xl:max-w-screen-xl m-auto pt-5 text-sm text-gray-700 pt-10 sm:pt16">
        <div className="mb-8 sm:flex">
          <div className="mr-5 lg:mr-20 mb-10">
            <img
              src={props.logo}
              style={{ maxHeight: '2rem' }}
              alt="BMG Card"
            />
          </div>

          <div className="sm:flex justify-center justify-between flex-grow">
            <div className="text-lg">
              <span className="font-bold">Atendimento</span>
              <br />
              <div className="text-base">
                <a
                  href={props.contact.creditRequestLink}
                  className="text-gray-600"
                  target="_blank"
                >
                  Solicite crédito
                </a>
                <br />
                <a href="#perguntas" className="text-gray-600">
                  Dúvidas frequentes
                </a>
                <br />
                <a href="#taxas" className="text-gray-600">
                  Taxas e Tarifas
                </a>
                <br />
                {/* <a href="#" className="text-gray-600">Política de privacidade</a> */}
              </div>
            </div>
            <div className="text-lg mt-6 sm:m-0">
              <span className="font-bold">Fale conosco</span>
              <br />
              <div className="text-base">
                <a
                  href={`tel:${props.contact.telefone}`}
                  className="text-gray-600"
                >
                  {props.contact.telefone}
                </a>
              </div>
            </div>
            <div className="text-lg mt-6 sm:m-0">
              <span className="font-bold">WhatsApp</span>
              <br />
              <div className="text-base">
                <a
                  href={props.contact.whatsappLink}
                  className="text-gray-600"
                  target="_blank"
                  onClick={() =>
                    gtagReportConversion(props.contact.whatsappLink)
                  }
                >
                  {props.contact.whatsapp}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">{props.text}</div>

        <div className="text-center my-10">{props.copyright}</div>
      </div>
    </div>
  )
}

Footer.propTypes = {
  text: PropTypes.object.isRequired,
  copyright: PropTypes.object.isRequired,
  contact: PropTypes.shape({
    telefone: PropTypes.string.isRequired,
    whatsapp: PropTypes.string.isRequired,
    creditRequestLink: PropTypes.string,
    whatsappLink: PropTypes.string,
  }),
  logo: PropTypes.string,
}
