import React, {FC} from 'react';
// @ts-ignore
import Style from './Login.module.css';
import {Required} from '../../../utils/validators';
import {Input} from '../common/FormControls';
import {Form, Formik, useFormikContext} from 'formik';
import {useActions} from '../../../hooks/useActions';
import classNames from 'classnames';
import Loader from '../common/Loader/Loader';

export type LoginFormData = {
  login: string
  password: string
}

const LoginForm: FC = () => {
  const {login} = useActions();

  return (
    <div className={Style.formContainer}>
      <Formik initialValues={{login: '', password: ''}} onSubmit={(formData, helpers) => {
        login(formData.login, formData.password, helpers);
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

              {isSubmitting && <div className={Style.formLoader}>
                <Loader/>
              </div>}
            </Form>
          );
        }
        }
      </Formik>
    </div>
  );
};

export default LoginForm;
