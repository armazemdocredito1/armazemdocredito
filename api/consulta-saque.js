const { default: axios } = require('axios')

module.exports = async (req, res) => {
  const cpf = req.query.cpf

  // We set querystring as site=true just to be able to filter on
  // request log external queries.
  const resp = await axios.post(
    `https://integrations.cluster.dataminercrm.com/bmg/saque/${cpf}/opportunity?site=true`,
    { cached: true, site: true },
    {
      headers: {
        authorization: 'Bearer v9k8ookntrgfqzon3pfny0ivofbkqh98',
      },
    }
  )

  res.json(resp.data)
}
