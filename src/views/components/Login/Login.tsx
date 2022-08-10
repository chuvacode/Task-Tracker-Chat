import React, {FC, FormEventHandler} from 'react';
// @ts-ignore
import Style from './Login.module.css';
import {Field, InjectedFormProps} from 'redux-form';
import {Required} from '../../../utils/validators';
import {Input} from '../common/FormControls';

type FormData = {
    login: string
    password: string
}

const login: FC<InjectedFormProps<FormData>> = ({handleSubmit}) => {
  return (
    <div className={Style.formContainer}>
      <form className={Style.form} onSubmit={handleSubmit}>
        <div className={Style.formTitle}>Вход</div>
        <Field component={Input}
               name={'login'}
               type="text"
               placeholder={'Имя пользователя'}
               validate={[Required]}/>
        <Field component={Input}
               name={'password'}
               type="password"
               placeholder={'Пароль'}
               validate={[Required]}/>
        <button className={Style.button}>Войти</button>
      </form>
    </div>
  );
};

export default login;
