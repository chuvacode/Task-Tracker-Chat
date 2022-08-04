import React from "react";
import Style from "./Login.module.css"
import {Field} from "redux-form";
import {Required} from "../../utils/validators";
import {Input} from "../common/FormControls";

let login = props => {
  return (
    <div className={Style.formContainer}>
      <form className={Style.form} onSubmit={props.handleSubmit}>
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
        {/*<div >Запомнить меня</div>*/}
        <button className={Style.button}>Войти</button>
      </form>
    </div>
  );
};

export default login;
