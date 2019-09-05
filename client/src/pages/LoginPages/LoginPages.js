import React  from 'react';
import connect from "react-redux/es/connect/connect";
import { SubmissionError } from 'redux-form';

import style from "./LoginPages.module.sass";

import * as yup from 'yup';
import schema from '../../validation/yupShema';

import HeaderLoginAndSignUp from "../../components/HeaderLoginAndSignUp/HeaderLoginAndSignUp";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";

import { loginUser } from "../../actions/actionCreators/userActionCreator";

function LoginPage(props){

    const toLoginUser = async (values) => {
        const email = await yup.reach(schema, 'email').isValid(values.email);

        if (!values.email) {
            throw new SubmissionError({
                email: 'Email field is required',
                _error: 'Login failed!',
            });
        }else if(!email){
            throw new SubmissionError({
                email: 'Email is not valid format',
                _error: 'Login failed!',
            });
        }
        if(!values.password){
            throw new SubmissionError({
                password: 'Password cannot be empty',
                _error: 'Password failed!',
            });
        }

        return props.toLoginUser(values)
    };

    return (
        <main className={style.userSignUpFlow}>
            <div className={style.container}>
                <HeaderLoginAndSignUp>Signup</HeaderLoginAndSignUp>
                <LoginForm onSubmit={toLoginUser}/>
            </div>
        </main>
    )
}

const mapStateToProps = (state) => ({
    user: state.userReducers.user
});
const mapDispatchToProps = dispatch => ({
    toLoginUser: user => dispatch(loginUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
