import React from "react";
import Style from "./Login.module.css"
import {Field} from "redux-form";

let login = props => {
  return (
    <div className={Style.formContainer}>
      <form className={Style.form} onSubmit={props.handleSubmit}>
        <div className={Style.formTitle}>Вход</div>
        <div className={Style.field}>
          <Field component={'input'} name={'login'} type="text" placeholder={'Имя пользователя'}/>
        </div>
        <div className={Style.field}>
          <Field component={'input'} name={'password'} type="password" placeholder={'Пароль'}/>
        </div>
        {/*<div >Запомнить меня</div>*/}
        <button className={Style.button}>Войти</button>
      </form>
    </div>
  );
};

export default login;
