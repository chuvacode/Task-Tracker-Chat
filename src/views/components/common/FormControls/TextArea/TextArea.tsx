import React, {createRef, FC, HTMLProps, InputHTMLAttributes, useEffect} from 'react';
// @ts-ignore
import Style from './TextArea.module.css';
import {setEndOfContenteditable} from '../../../../../utils';
import {change, WrappedFieldProps} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {RootState} from '../../../../../state/store';

type MapDispatchToProps = {
    change: typeof change
}

type Props = MapDispatchToProps;

const isBR = (element: any): boolean => !!element && element.tagName === 'BR';

const TextArea: FC<WrappedFieldProps & Props & HTMLProps<HTMLInputElement>> = ({input, meta, change, ...props}) => {
    const refSubmit: React.RefObject<HTMLInputElement> = createRef();
    const refTextarea: React.RefObject<HTMLDivElement> = createRef();

    useEffect(() => {
        if (!!refTextarea.current) {

            const el = refTextarea.current;
            refTextarea.current.focus();
            el.innerText = input.value;
            setEndOfContenteditable(el);

            if (el.childNodes.length === 1 && isBR(el.childNodes[0])) {
                change(meta.form, 'message', '');
            }
        }
    });

    const handlerInput = (e: React.FormEvent<HTMLDivElement>) => {
        change(meta.form, 'message', e.currentTarget.innerText);
    };

    const handlerKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!e.shiftKey && e.key === 'Enter') {
            e.preventDefault();
            if (refSubmit.current) {
                refSubmit.current.click();
            }
        }
        if (e.target.childNodes.length > 20) {
            e.preventDefault();
        }
    };

    return (
        <div className={Style.textareaContainer}>
            <div className={Style.textarea}
                 aria-multiline="true"
                 contentEditable="true"
                 role="textbox"
                 tabIndex={0}
                 onInput={handlerInput}
                 onKeyPress={handlerKeyPress}
                 ref={refTextarea}
                 {...props}>
            </div>
            {input.value === '' && <div className={Style.placeholder}>{props.placeholder}</div>}
            <input {...input} type="text" hidden/>
            <input {...input} type="submit" ref={refSubmit} hidden/>
        </div>
    );
};

export default compose(
    connect<WrappedFieldProps & Props & InputHTMLAttributes<HTMLInputElement>, MapDispatchToProps, unknown, RootState>
    (null, {change}),
)(TextArea);
