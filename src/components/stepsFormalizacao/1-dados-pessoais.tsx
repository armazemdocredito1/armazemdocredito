import React from 'react'
import Pill from '../pill'
import {
  CPFInput,
  TextInput,
  DateInput,
  CurrencyInput,
  PhoneInput,
  SelectInput,
} from '../form'
import { StepConfig } from '../../pages/formalizacao'

const optionsEscolaridade = [
  'Não escolarizado',
  'Ensino Fundamental Incompleto',
  'Ensino Fundamental Completo',
  'Ensino Médio Incompleto',
  'Ensino Médio Completo',
  'Ensino Superior Incompleto',
  'Ensino Superior Completo',
]

const optionsEstadoCivil = [
  'Não escolarizado',
  'Ensino Fundamental Incompleto',
  'Ensino Fundamental Completo',
  'Ensino Médio Incompleto',
  'Ensino Médio Completo',
  'Ensino Superior Incompleto',
  'Ensino Superior Completo',
]

interface Params {
  nome?: string
  consultor?: string
  cpf?: string
}

export default (attrs: any, params: Params, setValue: Function) => {
  const steps = [
    <div key={1}>
      <Pill className="mb-3 text-sm">
        Olá! Para solicitar o <strong>saque consignado</strong> preencha os
        dados a seguir.
      </Pill>
      <Pill className="mb-5 text-sm">
        Em caso de dúvidas, contate-nos pelo{' '}
        <a href="https://api.whatsapp.com/send?phone=551121990555">WhatsApp</a>{' '}
        ou pelo telefone <a href="tel:01121990555">(011) 2199-0555</a>.
      </Pill>

      <h1 className="text-3xl mb-5 font-display font-medium">
        Qual é o seu CPF?
      </h1>

      <CPFInput
        {...attrs}
        customMask={`000.000.000-00`}
        defaultValue={`${params.cpf}`}
        label="CPF"
        name="cpf"
        helperText="Complete o CPF para confirmar"
      />
    </div>,

    <div key={2}>
      <h1 className="text-3xl mb-5">Como você se chama?</h1>
      <TextInput
        {...attrs}
        label="Nome Completo"
        name="nome"
        className="w-full"
        helperText="Insira seu nome como está no documento"
      />
    </div>,

    <div key={3}>
      <h1 className="text-3xl mb-5">Qual seu email?</h1>
      <TextInput
        {...attrs}
        label="Email"
        name="email"
        type="email"
        className="w-full"
        helperText="Digite seu email para contato"
      />
    </div>,

    <div key={4}>
      <h1 className="text-3xl mb-5">Qual seu celular?</h1>
      <PhoneInput
        {...attrs}
        label="Celular"
        name="celular"
        className="w-full"
      />
    </div>,
  ]

  return {
    title: 'Dados Cadastrais',
    fields: [['cpf'], ['nome'], ['email'], ['celular']],
    steps,
  } as StepConfig
}

{
  /*<div key={4}>
      <h1 className="text-3xl mb-5">Qual é sua renda?</h1>
      <CurrencyInput
        {...attrs}
        label="Valor da renda mensal"
        name="income"
        className="w-full"
      />
    </div>,

    <div key={5}>
      <h1 className="text-3xl mb-5">Grau de instrução</h1>
      <SelectInput
        {...attrs}
        label="Escolaridade"
        name="scholarity"
        className="w-full"
        options={optionsEscolaridade.map((item) => ({
          value: item,
          label: item,
        }))}
      />
    </div>,

    <div key={5}>
      <h1 className="text-3xl mb-5">Estado Civil</h1>
      <SelectInput
        {...attrs}
        label="Estado Civil"
        name="civilState"
        className="w-full"
        options={optionsEscolaridade.map((item) => ({
          value: item,
          label: item,
        }))}
      />
    </div>,

    <div>
      <h1 className="text-3xl mb-5">Qual seu celular?</h1>
      <PhoneInput
        {...attrs}
        label="Celular"
        name="celular"
        className="w-full"
      />
    </div>,

    <div key={5}>
      <h1 className="text-3xl mb-5">Confira seus dados</h1>
      <TextInput
        {...attrs}
        label="Celular"
        name="celular"
        className="w-full"
        disabled
      />
      <TextInput
        {...attrs}
        label="Nome completo"
        name="name"
        className="w-full"
        disabled
      />
      <TextInput
        {...attrs}
        label="Data de nascimento"
        name="birthDate"
        className="w-full"
        disabled
      />
      <TextInput
        {...attrs}
        label="Valor da renda mensal"
        name="income"
        className="w-full"
        disabled
      />
      <TextInput
        {...attrs}
        label="Escolaridade"
        name="scholarity"
        className="w-full"
        disabled
      />
    </div>,
    */
}
