import React from 'react'
import { Link, graphql } from 'gatsby'
import { withPrismicPreview } from 'gatsby-plugin-prismic-previews'

import { linkResolver } from '../utils/LinkResolver'

const Index = ({ data }) => {
  return (
    <>
      <ul className="m-10 list-disc">
        {data.allPrismicLanding.nodes.map((item) => (
          <li>
            <Link to={item.uid}>{item.data.meta_titulo}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export const query = graphql`
  query HomePage {
    allPrismicLanding {
      nodes {
        _previewable
        uid
        data {
          meta_titulo
        }
      }
    }
  }
`

export default withPrismicPreview(Index, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
