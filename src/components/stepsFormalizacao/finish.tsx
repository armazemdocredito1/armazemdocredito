/* eslint-disable react/jsx-key */
import React from 'react'
import Pill from '../pill'
import { FaCheckCircle } from 'react-icons/fa'
import { AiOutlineLoading } from 'react-icons/ai'
import { Button } from '../form'

const Finish = (
  params: any,
  success: boolean,
  error: string,
  retry: Function
) => ({
  title: 'Fim',
  fields: [],
  steps: [
    <div>
      {success ? (
        <Pill className="mb-10 text-sm">
          <p>
            Sua solicitação foi recebida e será elaborado uma proposta
            personalizada para você.
          </p>
          <p className="mt-0">
            Nós te informaremos sobre novas atualizações, mas você também pode
            nos contatar pelo nosso{' '}
            <a href="https://api.whatsapp.com/send?phone=551121990555">
              WhatsApp
            </a>{' '}
            ou no telefone <a href="tel:01121990555">(011) 2199-0555</a>.
          </p>
        </Pill>
      ) : (
        ''
      )}

      <h1 className="text-2xl text-center font-display font-bold">
        {success && error === '' ? 'Enviado com sucesso!' : ''}
        {!success && error === '' ? (
          <>
            Enviando…
            <AiOutlineLoading
              className="text-8xl mx-auto mt-10 text-green-600 animate-spin"
            />
          </>
        ) : (
          ''
        )}
      </h1>
      {error !== '' && error !== undefined ? (
        <>
          <h1 className="text-2xl text-center font-bold font-display">
            Ocorreu um erro!
          </h1>
          <p className="text-center">
            Contate-nos através do{' '}
            <a href="https://api.whatsapp.com/send?phone=551121990555">
              WhatsApp
            </a>{' '}
            informando o erro abaixo.
          </p>
          <Button className="my-5 mx-auto block" type="button" onClick={retry}>
            Tentar novamente
          </Button>
          <p className="border rounded bg-gray-200 p-3 shadow-inner">{error}</p>
        </>
      ) : (
        ''
      )}

      <FaCheckCircle
        className={`text-8xl mx-auto mt-10 text-green-600 ${
          success ? '' : 'hidden'
        }`}
      />
    </div>,
  ],
})

export default Finish
