import React from 'react'
import PropTypes from 'prop-types'
import { RichText } from 'prismic-reactjs'
import { graphql } from 'gatsby'
import classNames from 'classnames/bind'

import * as styles from './Feature.module.css'
import { CTAButtons } from '../components/CTAButtons'

const cx = classNames.bind(styles)

const FeatureItem = ({
  cover,
  inverted,
  titleRaw,
  titleText,
  description,
  link,
  address,
  buttons,
}) => {
  let id = ''
  if (titleText.toLowerCase().includes('limite')) {
    id = 'limites'
  }

  return (
    <div className={cx({ 'p-margin': true, feature: true, inverted })} id={id}>
      {cover ? (
        <div
          className={styles.cover}
          style={{ backgroundImage: `url(${cover})` }}
        ></div>
      ) : null}
      <div className={cx({ description: true, noCover: !cover })}>
        <div className={styles.title}>
          <RichText render={titleRaw} />
        </div>
        <RichText render={description} />
        <CTAButtons {...buttons} centered={!cover} />
      </div>
    </div>
  )
}

FeatureItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  cover: PropTypes.string,
  description: PropTypes.array.isRequired,
  inverted: PropTypes.bool,
  cta: PropTypes.bool,
  buttons: PropTypes.shape({
    primaryLabel: PropTypes.string,
    primaryLink: PropTypes.string,
    secondaryLabel: PropTypes.string,
    secondaryLink: PropTypes.string,
  }),
  address: PropTypes.string,
}

export const Feature = ({ slice, className, contact }) => {
  const data = slice.primary

  return (
    <div className={`${styles.container} ${className || ''}`}>
      <FeatureItem
        titleRaw={data.titulo.raw}
        titleText={data.titulo.text}
        cover={data.imagem.url}
        description={data.corpo.raw}
        inverted={data.posicao_da_imagem.includes('direita')}
        buttons={{
          primaryLabel: data.rotulo_botao_primario,
          primaryLink: data.link_botao_primario,
          secondaryLabel: data.rotulo_botao_secundario,
          secondaryLink: data.link_botao_secundario,
        }}
        address={contact.creditRequestLink}
      />
    </div>
  )
}

export const query = graphql`
  fragment LandingDataBodyFuncionalidades on PrismicLandingDataBodyFuncionalidades {
    primary {
      titulo {
        raw
        text
      }
      corpo {
        raw
      }
      rotulo_botao_primario
      link_botao_primario
      rotulo_botao_secundario
      link_botao_secundario
      imagem {
        url
      }
      posicao_da_imagem
    }
  }
`
