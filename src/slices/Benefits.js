import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as faSolid from '@fortawesome/free-solid-svg-icons'
import * as faBrand from '@fortawesome/free-brands-svg-icons'
import { graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'

export const Benefits = ({ slice }) => {
  const benefitsData = slice.items.map((item) => {
    let icon
    let iconName =
      'fa' +
      item.icone
        .split('-')
        .map((x) => x[0].toUpperCase() + x.slice(1))
        .join('')

    if (faSolid[iconName]) {
      icon = faSolid[iconName]
    } else if (faBrand[iconName]) {
      icon = faBrand[iconName]
    }

    return {
      icon,
      title: item.titulo.text,
      description: <RichText render={item.descricao.raw} />,
    }
  })

  const benefits = benefitsData.map((x, i) => (
    <div key={i}>
      <span className="text-4xl">
        {x.icon && <FontAwesomeIcon icon={x.icon} className="icon mb-5" />}
      </span>
      <div className="font-bold">{x.title}</div>
      <div className="text-gray-700">{x.description}</div>
    </div>
  ))

  return (
    <section
      className="py-10 px-5 bg-blue-gray-200 shadow-inner"
      id="beneficio"
    >
      <div className="mx-auto" style={{ maxWidth: '980px' }}>
        <div className="text-4xl font-bold font-display tracking-tighter">
          <RichText render={slice.primary.titulo.raw} />
        </div>
        <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-10">
          {benefits}
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment LandingDataBodyBeneficios on PrismicLandingDataBodyBeneficios {
    primary {
      titulo {
        raw
      }
    }
    items {
      icone
      titulo {
        text
      }
      descricao {
        raw
      }
    }
  }
`
