import React from 'react'
import { TextInput, CEPInput, SelectInput } from '../form'
import { StepConfig } from '../../pages/formalizacao'

const UFS = [
  {'label': 'Acre', 'value': 'AC'},
  {'label': 'Alagoas', 'value': 'AL'},
  {'label': 'Amapá', 'value': 'AP'},
  {'label': 'Amazonas', 'value': 'AM'},
  {'label': 'Bahia', 'value': 'BA'},
  {'label': 'Ceará', 'value': 'CE'},
  {'label': 'Distrito Federal', 'value': 'DF'},
  {'label': 'Espírito Santo', 'value': 'ES'},
  {'label': 'Goiás', 'value': 'GO'},
  {'label': 'Maranhão', 'value': 'MA'},
  {'label': 'Mato Grosso', 'value': 'MT'},
  {'label': 'Mato Grosso do Sul', 'value': 'MS'},
  {'label': 'Minas Gerais', 'value': 'MG'},
  {'label': 'Pará', 'value': 'PA'},
  {'label': 'Paraíba', 'value': 'PB'},
  {'label': 'Paraná', 'value': 'PR'},
  {'label': 'Pernambuco', 'value': 'PE'},
  {'label': 'Piauí', 'value': 'PI'},
  {'label': 'Rio de Janeiro', 'value': 'RJ'},
  {'label': 'Rio Grande do Norte', 'value': 'RN'},
  {'label': 'Rio Grande do Sul', 'value': 'RS'},
  {'label': 'Rondônia', 'value': 'RO'},
  {'label': 'Roraima', 'value': 'RR'},
  {'label': 'Santa Catarina', 'value': 'SC'},
  {'label': 'São Paulo', 'value': 'SP'},
  {'label': 'Sergipe', 'value': 'SE'},
  {'label': 'Tocantins', 'value': 'TO'},
]

export default (elementAttributes: any) => ({
  title: 'Dados residenciais',
  fields: [
    ['cep', 'cidade', 'uf', 'bairro', 'logradouro', 'numero', 'complemento'],
  ],
  steps: [
    <div key={6}>
      <h1 className="text-3xl mb-5 font-bold font-medium">Qual seu endereço?</h1>
      <CEPInput
        {...elementAttributes}
        label="CEP"
        name="cep"
        className="w-full"
        inputMode="numeric"
      />
      <div className="flex gap-3">
        <SelectInput
          {...elementAttributes}
          label="UF"
          name="uf"
          className="w-full"
          options={UFS.map(uf => ({...uf, label: uf.value}))}
          isSearchable={true}
        />
        <TextInput
          {...elementAttributes}
          label="Cidade"
          name="cidade"
          className="w-full"
          wrapperClassName="grow"
        />
      </div>
      <TextInput
        {...elementAttributes}
        label="Bairro"
        name="bairro"
        className="w-full"
      />
      <TextInput
        {...elementAttributes}
        label="Logradouro"
        name="logradouro"
        className="w-full"
      />
      <TextInput
        {...elementAttributes}
        label="Número"
        name="numero"
        className="w-full"
        inputMode="numeric"
      />
      <TextInput
        {...elementAttributes}
        label="Complemento (se tiver)"
        name="complemento"
        className="w-full"
      />
    </div>,
  ],
}) as StepConfig
