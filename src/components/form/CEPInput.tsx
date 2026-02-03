import React from 'react'
import { MaskedInput } from './MaskedInput'
import { FormComponent } from './InputComponent'
import classnames from 'classnames'

const CPFInput = ({
  label,
  register,
  name,
  errors,
  touchedFields,
  helperText,
  ...rest
}) => {
  return (
    <FormComponent
      label={label}
      name={name}
      errors={errors}
      touchedFields={touchedFields}
      helperText={rest.helperText}
      className={rest.wrapperClassName}
    >
      <MaskedInput
        mask="00000-000"
        register={register}
        name={name}
        {...rest}
        inputMode="numeric"
        className={classnames([rest.className, 'form-input'])}
      />
    </FormComponent>
  )
}

export default CPFInput
