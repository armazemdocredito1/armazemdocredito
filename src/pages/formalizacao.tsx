import React, { useState, useEffect, ReactChild } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import axios from 'axios'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { validate as validateCPF } from 'cpf-check'

import '../utils/yup.locale.pt-br.js'
import Layout from '../layouts/formLayout'
import StatusBar from '../components/StatusBar'
import Wizard from '../components/Wizard'
import StageDadosPessoais from '../components/stepsFormalizacao/1-dados-pessoais'
import StageDadosResidenciais from '../components/stepsFormalizacao/2-dados-residenciais'
import StageDocumentos from '../components/stepsFormalizacao/3-documentos'
import StageDadosBancarios from '../components/stepsFormalizacao/4-dados-bancarios'
import Finish from '../components/stepsFormalizacao/finish'

import { resizeImage } from '../utils/compress'
import { alphabetToNumber, numberToAlphabet } from '../utils/numberToAlphabet'
import { getCPFVerifier } from '../utils/cpfVerifier'
import Mask from '../utils/mask.js'
import { gtag } from '../utils/google-tracking.js'
import { Store } from '../store'

interface IParams {
  cpf?: string
}

export interface FormParams {
  cpf: string
  nome: string
  email: string
  celular: string
  cep: string
  cidade: string
  uf: string
  bairro: string
  logradouro: string
  numero: string
  complemento: string
  identidadeFrente: any
  identidadeVerso: any
  tipoConta: string
  banco: string
  agencia: string
  conta: string
}

export type FormParamsPartial = Partial<FormParams>

export interface StepConfig {
  title: string
  fields: FormParamsPartial[][]
  steps: ReactChild[]
}

export const Formalizacao = ({ data }) => {
  const docPage = data.prismicLanding.data

  const [params, setParams] = useState<IParams>({})

  const {
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors, touchedFields },
    ...form
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        cpf: yup
          .string()
          .label('CPF')
          .required()
          .test('is-cpf', 'CPF inválido', (value) => validateCPF(value)),
        nome: yup.string().label('Nome').required(),
        email: yup.string().email().label('Email').required(),
        celular: yup.string().label('Celular').required(),
        cep: yup.string().label('CEP').required(),
        cidade: yup.string().label('Cidade').required(),
        uf: yup.string().label('UF').required(),
        bairro: yup.string().label('Bairro').required(),
        logradouro: yup.string().label('Logradouro').required(),
        numero: yup.string().label('Número').required(),
        complemento: yup.string().label('Complemento'),

        identidadeFrente: yup
          .mixed()
          .test('has-file', (value) => value && value[0]?.name !== '')
          .label('Frente da Identidade')
          .required(),
        identidadeVerso: yup
          .mixed()
          .test('has-file', (value) => value && value[0]?.name !== '')
          .label('Verso da Identidade')
          .required(),

        tipoConta: yup.string().label('Tipo da conta').required(),
        banco: yup.string().label('Banco').required(),
        agencia: yup.string().label('Agência').required(),
        conta: yup.string().label('Conta').required(),
      })
    ),
    defaultValues: {
      cpf: '',
      nome: '',
      email: '',
      cep: '',
      cidade: '',
      uf: '',
      bairro: '',
      logradouro: '',
      numero: '',
      complemento: '',
      identidadeFrente: null,
      identidadeVerso: null,
      tipoConta: '',
      banco: '',
      agencia: '',
      conta: '',
    },
  })

  const handleSubmit = (callback) => {
    return (event) => {
      event.preventDefault()
      callback()
    }
  }

  useEffect(() => {
    const token = new URLSearchParams(window.location.search)
    const id = token.get('id')
    const cpf = token.get('cpf')
    if (id === null && cpf === null) {
      return
    }

    let cpfMask = new Mask('000.000.000')
    let cpfStart = ''
    if (id !== null) {
      cpfStart = alphabetToNumber(id).toString()
    } else if (cpf !== null) {
      cpfMask = new Mask('000.000.000-00')
      cpfStart = cpf
    }

    const newParams = { cpf: cpfMask.getMasked(cpfStart) }
    setParams(newParams)

    Object.entries({ ...newParams })
      .filter(([_, value]) => value !== null)
      .forEach(([key, value]) => {
        setValue(key, value, { shouldDirty: true, shouldTouch: true })
      })

    gtag('event', 'start_form')
    gtag('event', 'conversion', {
      send_to: 'AW-954363374/echSCNX6g-kYEO7biccD',
      value: Store.amount,
      currency: 'BRL',
    })
  }, [])

  const isCurrentFieldsValid = async () => {
    const fields = stages[stage].fields[step]
    await Promise.all(fields.map(async (field) => trigger(field)))
    return fields.every(
      (field) => form.getFieldState(field).error === undefined
    )
  }

  const elementAttributes = {
    register: form.register,
    errors,
    touchedFields,
    control: form.control,
  }

  const [step, setStep] = useState(0)
  const [stage, setStage] = useState(0)
  const [lastCep, setLastCep] = useState('')

  const cep = watch('cep')

  useEffect(() => {
    if (!cep || cep.length !== 9) {
      return
    }

    if (lastCep === cep) {
      return
    }

    setLastCep(cep)
    updateAddress(cep)
  }, [cep])

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const stages = [
    StageDadosPessoais(elementAttributes, params, setValue),
    StageDadosResidenciais(elementAttributes),
    StageDocumentos(elementAttributes, form.getValues),
    StageDadosBancarios(elementAttributes),
    Finish(params, success, error, () => onFinish()),
  ]

  const onFinish = async () => {
    if (form.getValues === null) {
      return
    }

    setSuccess(false)
    setError('')

    const maxSize = 1024
    const data = form.getValues()

    gtag('set', 'user_data', { cpf: data.cpf })
    gtag('event', 'conversion', {
      send_to: 'AW-954363374/B7QmCPXcgukYEO7biccD',
      value: Store.amount,
      currency: 'BRL',
      transaction_id: data.cpf,
    })

    data.identidadeFrente = await resizeImage(
      data.identidadeFrente[0],
      maxSize
    ).catch((error) => {
      setError('O arquivo enviado não é uma imagem')
      throw error
    })
    data.identidadeVerso = await resizeImage(
      data.identidadeVerso[0],
      maxSize
    ).catch((error) => {
      setError('O arquivo enviado não é uma imagem')
      throw error
    })

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string)
    })

    axios
      .post('/api/formalizacao', formData)
      .then(() => setSuccess(true))
      .catch((data) => setError(data.toString()))
  }

  const stepChange = async (newStep: number) => {
    const isValid = await isCurrentFieldsValid()
    if (newStep > step && !isValid) {
      return
    }

    const cpf = form.getValues('cpf')
    if (cpf !== '') {
      gtag('set', 'user_data', { cpf })
    }

    if (newStep === stages[stage].steps.length) {
      if (stages.length > stage + 1) {
        if (stage + 1 === stages.length - 1) {
          onFinish()
        }

        setStage(stage + 1)
        setStep(0)
      }
    } else if (newStep === -1) {
      if (stage > 0) {
        setStep(stages[stage - 1].steps.length - 1)
        setStage(stage - 1)
      }
    } else {
      setStep(newStep)
    }
  }

  const updateAddress = (cep: string) => {
    axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((body) => {
      const address = {
        logradouro: body.data.logradouro,
        bairro: body.data.bairro,
        cidade: body.data.localidade,
        uf: body.data.uf,
      }
      setValue('bairro', address.bairro)
      setValue('cidade', address.cidade)
      setValue('uf', address.uf)
      setValue('logradouro', address.logradouro)
    })
  }

  const totalSteps = stages.reduce((acc, curr) => acc + curr.steps.length, 0)
  const currentGlobalStep =
    stages.slice(0, stage).reduce((acc, curr) => acc + curr.steps.length, 0) +
    step

  return (
    <Layout
      className="min-h-screen min-h-fit flex flex-col max-w-screen-md m-auto border-x"
      maxStages={stages.length}
      stageIndex={stage}
      stageName={stages[stage].title}
      type="formalizacao"
    >
      <Helmet title="Formalização de Proposta - Armazém do Crédito" />

      <StatusBar percentage={(currentGlobalStep / (totalSteps - 1)) * 100} />

      <form
        onSubmit={handleSubmit(() => stepChange(step + 1))}
        className="max-w-screen-xl p-5 grow flex flex-col"
      >
        <Wizard
          stepChange={stepChange}
          step={step}
          stage={stage}
          currentGlobalStep={currentGlobalStep}
          totalSteps={totalSteps}
          canNavigate={currentGlobalStep != totalSteps - 1}
        >
          {stages[stage].steps[step]}
        </Wizard>
      </form>
    </Layout>
  )
}

export default Formalizacao

export const query = graphql`
  query FormalizacaoQuery {
    prismicLanding(
      uid: { eq: "emprestimo-servidores-governo-rio-de-janeiro" }
    ) {
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
        }

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
