import React, {FC} from 'react';
// @ts-ignore
import Style from './Login.module.css';
import {Required} from '../../../utils/validators';
import {Input} from '../common/FormControls';
import {Form, Formik, useFormikContext} from 'formik';
import {useActions} from '../../../hooks/useActions';
import classNames from 'classnames';
import Loader from '../common/Loader/Loader';
import FormLoader from '../common/FormLoader/FormLoader';

export type LoginFormData = {
  login: string
  password: string
}

const LoginForm: FC = () => {
  const {login} = useActions();

  return (
    <div className={Style.formContainer}>
      <Formik initialValues={{login: '', password: ''}} onSubmit={(formData, helpers) => {
        login(formData, helpers);
      }}>
        {({isSubmitting, status}) => {
          return (
            <Form className={Style.form}>
              <div className={Style.formTitle}>Вход</div>
              <Input name="login"
                     type="text"
                     placeholder="Имя пользователя"
                     validate={Required}/>
              <Input name="password"
                     type="password"
                     placeholder="Пароль"
                     validate={Required}/>
              <button className={Style.button}>Войти</button>

              <div>{status}</div>
              <FormLoader isSubmitting={isSubmitting} />
            </Form>
          );
        }
        }
      </Formik>
    </div>
  );
};

export default LoginForm;
