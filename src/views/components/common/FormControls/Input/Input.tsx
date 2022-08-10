// @ts-ignore
import Style from './Input.module.css';
import React, {FC} from 'react';
import {WrappedFieldProps} from 'redux-form';

type Props = {
    type: string
    placeholder?: string
}

const Input: FC<WrappedFieldProps & Props> = ({input, meta, ...props}) => {
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

export default Input;
