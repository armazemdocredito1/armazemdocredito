import React, { useEffect, useState } from 'react'
import { FaAddressCard, FaCheck } from 'react-icons/fa'
import { BsCardHeading } from 'react-icons/bs'
import classnames from 'classnames'
import { StepConfig } from '../../pages/formalizacao'

const FileComponent = ({ name, error, children, register, getValues }) => {
  const [documentUploaded, setDocumentUploaded] = useState(
    getValues(name)?.length > 0
  )
  const attrs = register(name)

  return (
    <>
      <input
        type="file"
        className="hidden"
        name={name}
        accept="image/*,.pdf"
        multiple={false}
        {...attrs}
        onChange={(event) => {
          setDocumentUploaded(true)
          attrs.onChange(event)
        }}
      />
      <button
        type="button"
        className="
          block
          w-full h-32
          mt-5 p-2 mb-3

          flex flex-col
          items-center justify-center

          bg-gray-50 active:bg-gray-100

          border-dashed border-2 rounded
          shadow-inner
          focus:ring focus:ring-2 focus:border-transparent
        "
        onClick={() => document.querySelector(`input[name="${name}"]`)?.click()}
      >
        <p className="flex justify-center items-center text-left">{children}</p>

        <p
          className={classnames({
            'text-green-700': true,
            hidden: !documentUploaded,
          })}
        >
          <FaCheck className="inline" /> Foto carregada
        </p>
      </button>

      <p
        className={classnames({
          'text-sm text-gray-500 mt-1 text-center': true,
          'text-red-600': error,
        })}
      >
        {error?.message}
      </p>
    </>
  )
}

export default ({ errors, register }: any, getValues: Function) => {
  const [isFrenteSet, setIsFrenteSet] = useState(false)
  const [isVersoSet, setIsVersoSet] = useState(false)

  return {
    title: 'Documentos',
    fields: [['identidadeFrente', 'identidadeVerso']],
    steps: [
      <div>
        <h1 className="text-3xl mb-5 font-bold font-medium">
          Documento de Identidade
        </h1>
        <p>
          Agora, precisamos de uma foto do seu documento de identidade (RG, CNH,
          RNE). Procure um local plano, bem iluminado, e garanta que a foto não
          saia tremida.
        </p>

        <FileComponent
          name="identidadeFrente"
          error={errors['identidadeFrente']}
          register={register}
          getValues={getValues}
        >
          <FaAddressCard className="text-6xl ml-4 mr-5" />
          <span className="block text-grey">
            Toque aqui para inserir a <strong>frente</strong> do seu documento
            (lado com foto)
          </span>
        </FileComponent>

        <FileComponent
          name="identidadeVerso"
          error={errors['identidadeVerso']}
          register={register}
          getValues={getValues}
        >
          <BsCardHeading className="text-6xl ml-4 mr-5" />
          <span className="block text-grey">
            Toque aqui para inserir o <strong>verso</strong> do seu documento
          </span>
        </FileComponent>
      </div>,
    ],
  } as StepConfig
}
