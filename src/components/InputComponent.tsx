import React from "react";

export interface FormComponentProps {
  label: string;
  register?: Function;
  name: string;
  errors: Record<string, any>;
  touchedFields: Record<string, any>;
  children: React.ReactElement;
  className?: string;
  radio?: boolean;
}

export const FormComponent = ({
  label,
  register,
  name,
  errors,
  touchedFields,
  children,
  radio,
  ...rest
}: FormComponentProps) => {
  return (
    <label className={rest.className}>
      <span>
        {radio && register ? (
          <>
            <input
              type="radio"
              {...register("radio")}
              name="radio"
              value={name}
            />{" "}
          </>
        ) : null}
        {label}
      </span>
      {children}
      <p className="text-red-600 text-sm">
        {touchedFields && touchedFields[name] ? errors[name]?.message : ""}
      </p>
    </label>
  );
};

