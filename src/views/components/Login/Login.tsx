import React, {FC} from 'react';
// @ts-ignore
import Style from './Login.module.css';
import {Required} from '../../../utils/validators';
import {Input} from '../common/FormControls';
import {Form, Formik} from 'formik';
import {useDispatch} from 'react-redux';
import {authOperations} from '../../../state/auth';
import {DispatchWithThunk, RootState} from '../../../state/store';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk/es/types';

export type LoginFormData = {
  login: string
  password: string
}

const Login: FC = () => {

  const dispatch: DispatchWithThunk = useDispatch();

  const login = (formData: LoginFormData) => {
    dispatch(authOperations.login(formData.login, formData.password));
  };

  return (
    <div className={Style.formContainer}>

      <Formik initialValues={{login: '', password: ''}} onSubmit={login}>
        {() => (
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
