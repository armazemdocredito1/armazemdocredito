import React from 'react'
import { FormComponent } from './InputComponent'
import classnames from 'classnames'

const TextInput = ({
  label,
  register,
  name,
  errors,
  touchedFields,
  helperText,
  wrapperClassName,
  className
}) => {
  return (
    <FormComponent
      label={label}
      name={name}
      errors={errors}
      touchedFields={touchedFields}
      helperText={helperText}
      className={wrapperClassName}
    >
      <input
        type="text"
        {...register(name)}
        className={classnames([className, 'form-input'])}
      />
    </FormComponent>
  )
}

export default TextInput
