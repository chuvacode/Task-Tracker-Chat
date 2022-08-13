// @ts-ignore
import Style from './Input.module.css';
import React, {FC} from 'react';
import {FieldHookConfig, useField} from 'formik';

const Input: FC<FieldHookConfig<string>> = (props) => {

  const [field, meta, helpers] = useField(props);

  const hasError = meta.touched && meta.error;

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
