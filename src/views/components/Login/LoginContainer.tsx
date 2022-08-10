import Login, {LoginFormData} from './Login';
import React, {FC} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {authOperations} from '../../../state/auth';

type Props = {
    login: (login: string, password: string) => void
}

const LoginContainer: FC<Props> = props => {
    const submit = ({login, password}: LoginFormData) => {
        props.login(login, password);
    };
    return <WithReduxFormLogin {...props} onSubmit={submit}/>;
};

const WithReduxFormLogin = reduxForm<LoginFormData>({form: 'login'})(Login);

export default connect(null, {
    login: authOperations.login,
})(LoginContainer);


