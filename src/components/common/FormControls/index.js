import React from "react";
import Style from './FormControlls.module.css';

export const Input = ({input, meta, ...props}) => {
  const hasError = meta.touched && meta.error;
  return (
    <div className={`${Style.field} ${hasError && Style.error}`}>
      <div className={Style.inputContainer}>
        <input {...input} {...props} />
      </div>
      <div className={Style.errorMessage}>
        {meta.touched && meta.error && <span>{meta.error}</span>}
      </div>
    </div>
  );
};
