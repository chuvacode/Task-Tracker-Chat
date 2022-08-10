import React, {FC} from 'react';
// @ts-ignore
import Style from './ChatInput.module.css';
import {Field, InjectedFormProps} from 'redux-form';
import {TextArea} from '../common/FormControls';


type FormData = {
    message: string
}

type Props = {
    handleSubmit: (formData: FormData) => void
    reset: () => void
}

const ChatInput: FC<InjectedFormProps<FormData & Props> & Props> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={Style.formNewMessage}>
            <Field component={TextArea}
                   name={'message'}
                   placeholder={'Напишите сообщение...'}
                   type={'text'}
            />
            <button>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.1067 4.20728L9.64303 14.1266C9.00193 15.5513 6.95714 15.4857 6.4086 14.0229L5.4793 11.5448C5.30184 11.0716 4.92843 10.6982 4.45519 10.5207L1.97708 9.5914C0.514282 9.04286 0.448744 6.99806 1.87341 6.35696L11.7927 1.89327C13.2614 1.23238 14.7676 2.73863 14.1067 4.20728Z"
                        stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </form>
    );
};

export default ChatInput;
