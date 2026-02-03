require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-loadable-components-ssr',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-CG005D469T', // Google Analytics / GA
          'AW-954363374', // Google Ads
        ],
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-prismic-previews',
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
      },
    },
    'gatsby-plugin-image',
  ],
  siteMetadata: {
    siteUrl: 'https://www.armazemdocredito.com.br',
  },
}
