import React from "react";
import { MaskedInput } from "./MaskedInput";
import { FormComponent } from "./InputComponent";

export const CPFInput = ({
  label,
  register,
  name,
  errors,
  touchedFields,
  radio,
  ...rest
}) => {
  return (
    <FormComponent
      label={label}
      name={name}
      errors={errors}
      touchedFields={touchedFields}
      radio={radio}
      register={register}
    >
      <MaskedInput
        mask="000.000.000-00"
        register={register}
        name={name}
        inputMode="numeric"
        {...rest}
      />
    </FormComponent>
  );
};

