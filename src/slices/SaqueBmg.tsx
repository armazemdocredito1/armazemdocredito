import React, { useState } from 'react'
import { CPFInput } from '../components/CPFInput'
import { graphql, Link } from 'gatsby'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { validate } from 'cpf-check'
import '../utils/yup.locale.pt-br.js'
import classNames from 'classnames'
import { formatNumber } from '../utils/formatNumber'
import { BiLoaderAlt } from 'react-icons/bi'
import { Store } from '../store'
import { Button } from '../components/Button'

const schema = yupResolver(
  yup.object().shape({
    cpf: yup
      .string()
      .label('CPF')
      .required()
      .test('is-cpf', 'CPF inválido', (value) => validate(value)),
  })
)

export const SaqueBmg = ({ slice }) => {
  const [limite, setLimite] = useState(-1)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    formState: { errors, touchedFields },
    handleSubmit,
    getValues,
  } = useForm({
    defaultValues: { cpf: '' },
    resolver: schema,
  })

  const submit = (data) => {
    setIsLoading(true)
    fetch(`/api/consulta-saque?cpf=${data.cpf}`)
      .then(async (data) => {
        setError('')
        setIsLoading(false)
        const text = await data.text()
        if (!data.ok) {
          throw new Error(`${data.statusCode} - ${text.slice(0, 20)}`)
        }
        const { amount } = JSON.parse(text)
        setLimite(amount)
        gtag('set', 'user_data', { saque: amount })
        gtag('event', 'conversion', {
          send_to: 'AW-954363374/511sCLCjhOkYEO7biccD',
          value: amount,
          currency: 'BRL',
        })
        Store.amount = amount
      })
      .catch((error) => {
        setIsLoading(false)
        setError(error.toString())
      })
  }

  return (
    <div
      className="h-full w-full py-10 bg-blue-gray-200 shadow-inner md:text-left text-center"
      id="consulta"
    >
      <div className="px-5 text-4xl md:text-4xl leading-tight mb-5 font-bold font-display text-center tracking-tighter">
        Consultar valor do saque
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 pt-10 justify-center md:w-[40em] m-auto">
        <div className="space-y-2 border-b border-blue-gray-400 pb-5 md:pb-0 md:border-none">
          <p>
            Quer saber qual <strong>valor exato</strong> de saque consignado
            você tem disponível pelo Bmg?
          </p>
          <p>Digite o CPF e veja o valor imediatamente!</p>
          <p className={limite === -1 ? 'hidden' : ''}>
            <strong>CPF</strong>: {getValues('cpf')}
          </p>
        </div>

        <div
          className={classNames([
            'mt-5 md:mt-0',
            limite !== -1 ? 'hidden' : '',
          ])}
        >
          {error !== '' ? (
            <div className="text-red-700 text-center">
              Erro na consulta, tente novamente! {error}
            </div>
          ) : null}
          {isLoading ? (
            <BiLoaderAlt className="animate-spin text-5xl text-center w-full text-wild-orange" />
          ) : (
            <form
              onSubmit={handleSubmit(submit)}
              className="flex flex-col items-center"
            >
              <label className="font-bold">
                <CPFInput
                  className="rounded-full border-blue-gray-500 block text-center"
                  placeholder="Digite o CPF"
                  register={register}
                  name="cpf"
                  errors={errors}
                  touchedFields={touchedFields}
                />{' '}
              </label>

              <button className="btn btn-orange mt-3">Ver Saque</button>
            </form>
          )}
        </div>

        <div
          className={classNames([
            limite === -1 ? 'hidden' : '',
            'text-center md:mt-0 mt-5',
          ])}
        >
          {limite === 0 ? (
            <>
              <div className="text-xl uppercase text-center font-bold text-red-600 mb-3">
                Sem valor disponível
              </div>
              <p>O CPF informado não possui valores disponíveis.</p>
              <button
                className="btn btn-outline-orange mt-3"
                onClick={() => setLimite(-1)}
              >
                Nova consulta
              </button>
              <br />

              <div className="mt-3 md:px-0 px-5">
                <Button
                  href={`https://api.whatsapp.com/send?phone=551121990555&text=Gostaria%20de%20consultar%20outras%20op%C3%A7%C3%B5es%20de%20cr%C3%A9dito%20consignado.%20Meu%20CPF%20%C3%A9%20${getValues(
                    'cpf'
                  )}`}
                  noBtn={true}
                  className="text-blue-600 normal-case font-normal"
                >
                  Consultar outras opções de crédito por WhatsApp
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-5xl font-bold text-green-700">
                {formatNumber(limite.toString())}
              </div>
              <div className="text-xl uppercase">Saque disponível</div>
              <Link
                to={`/formalizacao?cpf=${getValues('cpf')}`}
                className="btn btn-orange mt-3"
              >
                Sacar agora!
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  fragment LandingDataBodySaqueConsignado on PrismicLandingDataBodySaqueConsignado {
    id
  }
`
