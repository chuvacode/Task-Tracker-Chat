import React, {createRef, useEffect} from "react";
import Style from './FormControlls.module.css';
import {compose} from "redux";
import {change} from "redux-form";
import {connect} from "react-redux";
import {setEndOfContenteditable} from "../../../utils/setEndOfContenteditable";

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

const TextArea = ({input, meta, change, ...props}) => {
  let refSubmit = createRef();
  let refTextarea = createRef();

  useEffect(() => {
    let el = refTextarea.current;
    refTextarea.current.focus();
    el.innerText = input.value;
    setEndOfContenteditable(el);

    if (el.childNodes.length === 1 && el.childNodes[0].tagName === 'BR') {
      change(meta.form, 'message', '');
    }
  });

  const handlerInput = e => {
    change(meta.form, 'message', e.target.innerText);
  };

  const handlerKeyPress = e => {
    if (!e.shiftKey && e.key === 'Enter') {
      e.preventDefault();
      refSubmit.current.click();
    }
    if (e.target.childNodes.length > 20) {
      e.preventDefault();
    }
  };

  return (<div className={Style.textareaContainer}>
    <div className={Style.textarea}
         aria-multiline='true'
         contentEditable='true'
         role='textbox'
         tabIndex='0'
         onInput={handlerInput}
         onKeyPress={handlerKeyPress}
         ref={refTextarea}
         {...props}>
    </div>
    {input.value === '' && <div className={Style.placeholder}>{props.placeholder}</div>}
    <input {...input} type="text" hidden/>
    <input {...input} type="submit" ref={refSubmit} hidden/>
  </div>);
};
export const TextAreaContainer = compose(
  connect(null, {change})
)(TextArea);
