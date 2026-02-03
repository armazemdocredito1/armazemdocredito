import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { RichText } from 'prismic-reactjs'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'
import loadable from '@loadable/component'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { Footer } from '../components/footer'
import { Layout } from '../layouts/default'
import { linkResolver } from '../utils/LinkResolver'

const SliceZone = loadable(() => import('../components/SliceZone'), {
  resolveComponent: (component) => component.SliceZone,
})

config.autoAddCss = false

const LandingTemplate = ({ data }) => {
  const docContato = data.prismicContato.data
  const docPage = data.prismicLanding.data

  const footerText = <RichText render={docContato.rodape.raw} />
  const copyright = <RichText render={docContato.copyright.raw} />

  const contact = {
    telefone: docContato.telefone,
    whatsapp: docContato.whatsapp,
    whatsappLink: docContato.enviar_mensagem.url,
    creditRequestLink: docContato.pedir_emprestimo.url,
  }

  const menu = docPage.menu.map((item) => ({
    label: item.rotulo,
    link: item.link_interno,
  }))

  return (
    <Layout
      contato={contact}
      logo={docPage.logo.url}
      logo_large={docPage.logo_grande ?? false}
      menu={menu}
    >
      <Helmet title={docPage.meta_titulo} />
      <SliceZone sliceZone={docPage.body} contact={contact} />
      <Footer
        contact={contact}
        text={footerText}
        copyright={copyright}
        logo={docPage.logo.url}
      />
    </Layout>
  )
}

LandingTemplate.propTypes = {
  location: PropTypes.object,
}

export const query = graphql`
  query PageQuery($uid: String) {
    prismicLanding(uid: { eq: $uid }) {
      _previewable
      url
      data {
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...LandingDataBodyHero
          ...LandingDataBodyBeneficios
          ...LandingDataBodyFuncionalidades
          ...LandingDataBodyFaqSection
          ...LandingDataBodyTaxas
          ...LandingDataBodySteps
          ...LandingDataBodySaqueConsignado
        }

        logo {
          url
        }

        logo_grande

        menu {
          rotulo
          link_interno
        }

        meta_titulo
      }
    }

    prismicContato {
      data {
        enviar_mensagem {
          url
        }
        pedir_emprestimo {
          url
        }
        rodape {
          raw
        }
        copyright {
          raw
        }
        telefone
        whatsapp
      }
    }
  }
`

export default withPrismicPreview(LandingTemplate, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
