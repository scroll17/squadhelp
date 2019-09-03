import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { reduxForm, Fields } from 'redux-form';

import style from './SignupForm.module.sass';

import Input from './Input/Input'
import JoinAs from './JoinAs/JoinAs'

import { ROLE, FORM } from '../../../constants'

import { asyncValidationSignUpForm } from '../../../validation/asyncValidationSignUpForm'

class SignUpForm extends Component {

    styleButtonWithPristine = {
      cursor: 'not-allowed',
    };

    firstInputs =  props => <Input {...props}
                          name={{one:"firstName", two:'lastName'}}
                          placeholder={{one:"First name", two:'Last name'}}
                          type={{one:"text", two:'text'}}  />;

    secondInputs = props => <Input {...props}
                          name={{one:"displayName", two:'email'}}
                          placeholder={{one:"Display name", two:'Email address'}}
                          type={{one:"text", two:'email'}}  />;

    thirdInputs = props => <Input {...props}
                         name={{one:"password", two:'passwordRepeat'}}
                         placeholder={{one:"Password", two:'Password confirmation'}}
                         type={{one:"password", two:'password'}}  />;

    render () {
        const { handleSubmit, submitting, pristine } = this.props;

        return (
            <div className={style.signUpForm}>
                <div className={style.signUpText}>
                    <h2>CREATE AN ACCOUNT</h2>
                    <h4>We always keep your name and email address private.</h4>
                </div>
                <form onSubmit={handleSubmit} className={style.formWrapper}>

                    <Fields names={[ 'firstName', 'lastName' ]} component={this.firstInputs}/>
                    <Fields names={[ 'displayName', 'email' ]} component={this.secondInputs}/>
                    <Fields names={[ 'password', 'passwordRepeat' ]} component={this.thirdInputs}/>

                    <JoinAs roles={ROLE.BUYER}  />
                    <JoinAs roles={ROLE.CREATIVE} />

                    <div className={style.button}>
                        <button type="submit"
                                disabled={pristine || submitting}
                                style={pristine ? this.styleButtonWithPristine : null}
                        >
                            Create account
                        </button>
                    </div>

                    <div className={style.finePrint}>
                        <p>By clicking this button, you agree to our
                            <Link to={"/Terms&Conditions"}>Terms of Service.</Link>
                        </p>
                    </div>
                </form>
            </div>
        );
    }
}

SignUpForm = reduxForm ({
    form: FORM.SIGN_UP,
    asyncValidate: asyncValidationSignUpForm,
    initialValues: {role: ROLE.BUYER}
})(SignUpForm);

export default SignUpForm;
