const { readFileSync } = require('fs')
const multiparty = require('multiparty')
const pipefy = require('./pipefy-client')

const parseForm = (req) =>
  new Promise((resolve, reject) => {
    const form = new multiparty.Form()

    form.parse(req, function (error, fields, files) {
      if (error) return reject(error)

      return resolve([fields, files])
    })
  })

const upload = async (file, cardId, fieldId) => {
  const filename = file.originalFilename
  const contentType = file.headers['content-type']
  const content = readFileSync(file.path)

  const uploadUrlResp = await pipefy.getUploadUrl(filename)
  const uploadUrl = uploadUrlResp.data.data.createPresignedUrl.url

  await pipefy.uploadFile(
    uploadUrl,
    contentType,
    content,
  )

  const attach = await pipefy.attachFile(uploadUrl, cardId, fieldId)

  return attach
}

module.exports = async (req, resp) => {
  const [fields, files] = await parseForm(req)

  const cardPayload = {
    cpf: fields.cpf,
    nome: fields.nome,
    email: fields.email,
    celular: fields.celular,
    in_cio_cpf: fields.cpf,
    consultor: fields.consultor,
    data_de_nascimento: fields.nascimento,
    cep: fields.cep,
    cidade: fields.cidade,
    uf: fields.uf,
    bairro: fields.bairro,
    logradouro: fields.logradouro,
    n_mero: fields.numero,
    complemento: fields.complemento,
    banco: fields.banco,
    ag_ncia: fields.agencia,
    conta: fields.conta,
    tipo_da_conta: fields.tipoConta,
  }

  for (const key of Object.keys(cardPayload)) {
    if (cardPayload[key] === undefined) continue
    cardPayload[key] = cardPayload[key][0]
  }

  const cardResp = await pipefy.createCard(cardPayload)
  const cardData = cardResp.data.data.createCard

  await upload(files.identidadeFrente[0], cardData.card.id, 'documento_de_identidade_frente')
  await upload(files.identidadeVerso[0], cardData.card.id, 'documento_de_identidade_verso')

  resp.json({status: 'ok'})
}
