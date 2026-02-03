import React from 'react'
import Pill from '../pill'
import { SelectInput, TextInput } from '../form'
import Bancos from 'bancos-brasileiros'
import classnames from 'classnames'
import { StepConfig } from '../../pages/formalizacao'

const DadosBancarios = (attrs: unknown) => ({
  title: 'Dados bancários',
  fields: [['tipoConta', 'banco', 'agencia', 'conta']],
  steps: [
    <div key={8}>
      <h1 className="text-3xl mb-5">Conta Bancária</h1>
      <Pill className="mb-5 text-sm">
        Informe os dados da conta <strong>onde será liberado o crédito</strong>.
        Note que, por questões de segurança, o valor{' '}
        <strong>
          só pode ser depositado na conta onde se recebe o benefício
        </strong>{' '}
        .
      </Pill>
      <label className="font-semibold">Tipo da Conta</label>
      <div className="flex flex-col justify-around my-3 gap-5">
        <label>
          <input
            {...attrs.register('tipoConta')}
            type="radio"
            name="tipoConta"
            value="Conta Corrente"
            className="form-input"
          />{' '}
          Conta Corrente
        </label>
        <label>
          <input
            type="radio"
            className="form-radio"
            name="tipoConta"
            value="Conta Poupança"
            className="form-input"
            {...attrs.register('tipoConta')}
          />{' '}
          Conta Poupança
        </label>

        <p
          className={classnames({
            'text-sm text-gray-500 mt-1': true,
            'text-red-600': attrs.errors['tipoConta'],
            hidden: attrs.errors.tipoConta === undefined,
          })}
        >
          {attrs.errors['tipoConta']?.message || attrs.helperText}
        </p>
      </div>

      <SelectInput
        {...attrs}
        label="Banco"
        name="banco"
        className="w-full"
        options={Bancos.map((banco) => ({
          value: banco.LongName,
          label: `${banco.COMPE} - ${banco.LongName}`,
        }))}
        isSearchable={true}
      />
      <TextInput
        {...attrs}
        label="Agência"
        name="agencia"
        className="w-full"
        maxLength="20"
        inputMode="numeric"
      />
      <TextInput
        {...attrs}
        label="Conta com dígito"
        name="conta"
        className="w-full"
        maxLength="20"
        inputMode="numeric"
      />
    </div>,
  ],
}) as StepConfig


export default DadosBancarios
