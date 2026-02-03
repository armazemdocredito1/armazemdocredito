import React from "react"
import Mask from '../utils/mask'

export interface MaskedInputProps {
  register: Function
  name: string
  mask: string | ((mask: string) => string)
  className?: string
  inputMode: string
}

export const MaskedInput = ({
  register,
  name,
  mask,
  className,
  ...rest
}: MaskedInputProps) => {

  let getNewValue: (mask: string) => string
  if (typeof mask === 'function') {
    getNewValue = mask
  }
  else {
    const maskObj = new Mask(mask)
    getNewValue = (value: string) => {
      return maskObj.getMasked(value)
    }
  }

  return (
    <input
      type="text"
      {...register(name, {
        onChange: event => event.target.value = getNewValue(event.target.value),
        setValueAs: value => getNewValue(value),
      })}
      className={className || 'block mt-1 w-full'}
      defaultValue=""
      {...rest}
    />
  )
}

