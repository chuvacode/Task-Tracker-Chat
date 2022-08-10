import Login from './Login';
import React, {FC} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {authOperations} from '../../../state/auth';

type Props = {
    login: (login: string, password: string) => void
}

type FormData = {
    login: string
    password: string
}

const LoginContainer: FC<Props> = props => {
    const submit = ({login, password}: FormData) => {
        props.login(login, password);
    };
    return <WithReduxFormLogin {...props} onSubmit={submit}/>;
};

const WithReduxFormLogin = reduxForm<FormData>({form: 'login'})(Login);

export default connect(null, {
    login: authOperations.login,
})(LoginContainer);


