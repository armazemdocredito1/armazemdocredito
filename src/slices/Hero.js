import * as React from 'react'
import { RichText } from 'prismic-reactjs'
import { graphql } from 'gatsby'

import { CTAButtons } from '../components/CTAButtons'

export const Hero = ({ slice, contact }) => {
  const data = slice.primary

  const title = data.titulo.html ? (
    <span
      dangerouslySetInnerHTML={{
        __html: data.titulo.html
          .replace(/&lt;marker&gt;/g, '<marker>')
          .replace(/&lt;\/marker&gt;/g, '</marker>'),
      }}
    />
  ) : (
    <RichText render={data.titulo.raw} />
  )
  const description = <RichText render={data.descricao.raw} />
  const imageUrl = data.capa.url

  const buttons = {
    primaryLabel: data.rotulo_botao_primario,
    primaryLink: data.endereco_botao_primario,
    secondaryLabel: data.rotulo_botao_secundario,
    secondaryLink: data.endereco_botao_secundario,
  }

  let Title = (
    <div className="px-5 pt-2 pb-5 md:py-20 box-border max-w-screen-lg text-center">
      <div className="text-4xl md:text-5xl leading-tight mb-5 font-bold font-display main-title">
        {title}
      </div>
      <div className="mx-auto max-w-screen-md">{description}</div>
      <CTAButtons {...buttons} reverted={true} centered={true} />
    </div>
  )
  let Cover = null

  if (imageUrl) {
    Title = (
      <div className="md:min-w-1/2 md:w-1/2 px-5 pb-10 md:py-5 box-border">
        <div className="text-5xl leading-tight mb-10 font-bold font-display">
          {title}
        </div>
        {description}
        <CTAButtons {...buttons} reverted={true} />
      </div>
    )

    Cover = (
      <div
        className="h-full w-full md:w-auto flex items-center md:top-0 md:left-1/2 md:right-0 mb-5 md:mb-0 bg-cover bg-no-repeat"
        style={{ zIndex: -1 }}
      >
        <img src={imageUrl} className="m-auto" />
      </div>
    )
  }

  return (
    <div className="relative h-full flex-grow flex items-stretch flex-wrap max-w-screen-xl m-auto">
      <div className="flex items-center m-auto flex-col flex-col-reverse md:flex-row">
        {Title}
        {Cover}
      </div>
    </div>
  )
}

export const query = graphql`
  fragment LandingDataBodyHero on PrismicLandingDataBodyHero {
    primary {
      capa {
        url
      }
      descricao {
        raw
      }
      titulo {
        html
        raw
      }
      rotulo_botao_primario
      endereco_botao_primario
      rotulo_botao_secundario
      endereco_botao_secundario
    }
  }
`
