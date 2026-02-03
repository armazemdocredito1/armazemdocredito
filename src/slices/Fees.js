import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faSolid from '@fortawesome/free-solid-svg-icons'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

export const Fees = ({ slice, contact }) => {
  return (
    <div className="border-t border-b bg-gray-100 py-10" id="taxas">
      <div className="max-w-screen-xl mx-auto items-center px-5">
        <div className="text-3xl tracking-tighter font-bold mb-10 font-display text-center">
          <RichText render={slice.primary.titulo.raw} />
        </div>

        <div className="flex justify-center flex-col md:flex-row">
          <div
            className="md:w-1/2 bg-no-repeat bg-cover bg-center bg-gray-100 md:rounded-none md:rounded-l rounded-t shadow taxes-cover-height"
            style={{ backgroundImage: `url(${slice.primary.capa.url})` }}
          ></div>
          <div className="shadow p-6 bg-white md:rounded-none md:rounded-r rounded-b">
            <div className="text-center text-xl text-wild-orange font-bold">
              <RichText render={ slice.primary.produto.raw } />
            </div>

            <hr className="mt-5" />

            <ul className="flex flex-col gap-y-3 pr-5 py-5">
              {slice.items.map((item, i) => (
                <li
                  className="grid grid-cols-2 gap-x-5"
                  style={{ gridTemplateColumns: 'max-content auto' }}
                  key={i}
                >
                  <div className="text-green-600 row-span-2">
                    <FontAwesomeIcon icon={faSolid.faCheck} />
                  </div>
                  <div className="text-left block font-normal">
                    <RichText render={item.titulo_da_taxa.raw} />
                  </div>
                  <div className="inline text-sm text-gray-600">
                    <RichText render={item.valor_da_taxa.raw} />
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={contact.creditRequestLink}
              className="bg-green-600 block w-full text-center rounded-full text-white mt-2 p-2"
              target="_blank"
            >
              Pedir agora
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  fragment LandingDataBodyTaxas on PrismicLandingDataBodyTaxas {
    id
    items {
      titulo_da_taxa {
        raw
      }
      valor_da_taxa {
        raw
      }
    }
    primary {
      capa {
        url
      }
      produto {
        raw
      }
      titulo {
        raw
      }
    }
  }
`
