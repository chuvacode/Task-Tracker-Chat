// @ts-ignore
import Style from './Input.module.css';
import React, {FC, HTMLInputTypeAttribute} from 'react';
import {FieldHookConfig, FieldInputProps, FieldMetaProps, FieldProps, useField} from 'formik';

type Props = {
  name: string
  type: string
  placeholder?: string
  validate?: any
}

const Input: FC<FieldHookConfig<string>> = (props) => {

  const [field, meta, helpers] = useField(props);

  const hasError = meta.touched && meta.error;

  if (field.name === 'login') console.log(meta);

  return (
    <div className={`${Style.field} ${hasError && Style.error}`}>
      <div className={Style.inputContainer}>
        <input {...field} type={props.type} placeholder={props.placeholder} />
      </div>
      <div className={Style.errorMessage}>
        {meta.touched && meta.error && <span>{meta.error}</span>}
      </div>
    </div>
  );
};

export default Input;
