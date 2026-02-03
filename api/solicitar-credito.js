const util = require('util')
const { default: axios } = require('axios')

module.exports = async (req, resp) => {
  try {
    const response = await axios.post(
      'https://crm.cluster.dataminercrm.com/solicitacao-credito',
      req.body,
      {
        headers: { authorization: process.env.DATAMINER_TOKEN },
      }
    )

    resp.json({ status: 'ok' })
  } catch (error) {
    const {statusCode, message} = error.response.data
    resp.status(statusCode).send(message)
  }
}
