const { default: axios } = require('axios')

const PIPE_ID = 302223078
const PIPEFY_URL = 'https://api.pipefy.com/graphql'
const ORGANIZATION_ID = '300727646'

const makeRequest = (payload) =>
  axios.post(PIPEFY_URL, payload, {
    headers: {
      authorization: `Bearer ${process.env.PIPEFY_TOKEN}`,
    },
  })

const createCard = (payload) =>
  makeRequest({
    query: `
      mutation createCard($card: CreateCardInput!) {
        createCard(input: $card) {
          clientMutationId
          card {
            id
          }
        }
      }
    `,
    variables: {
      card: {
        clientMutationId: '1',
        pipe_id: PIPE_ID,
        fields_attributes: Object.entries(payload).map(([key, value]) => ({
          field_id: key,
          field_value: value,
        })),
      },
    },
  })

const getUploadUrl = (fileName) =>
  makeRequest({
    query: `
      mutation createPresignedUrl($input: CreatePresignedUrlInput!) {
        createPresignedUrl(input: $input) {
          downloadUrl
          url
        }
      }
    `,
    variables: {
      input: {
        clientMutationId: '1',
        organizationId: ORGANIZATION_ID,
        fileName: fileName,
      },
    },
  })

const uploadFile = (url, contentType, content) =>
  axios({
    url: url,
    method: 'put',
    data: content, 
    headers: { 'content-type': contentType }
  })

const attachFile = (url, cardId, fieldId) => {
  const urlPart = /amazonaws.com\/(orgs\/.*?)\?/.exec(url)
  const documentPath = decodeURIComponent(urlPart[1])

  return makeRequest({
    query: `
      mutation($input: UpdateCardFieldInput!) {
        updateCardField(input: $input) {
          clientMutationId
          success
        }
      }
    `,
    variables: {
      input: {
        field_id: fieldId,
        new_value: documentPath,
        card_id: cardId,
      },
    },
  })

}

module.exports = {
  createCard,
  getUploadUrl,
  uploadFile,
  attachFile,
}
