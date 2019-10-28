import React from 'react';
import connect from "react-redux/es/connect/connect";

import { reduxForm, Field } from 'redux-form'

import style from './Balance.module.sass'

import {FORM, TYPE_FIELD} from "../../../constants";
import {formatCreditCardNumber, formatSum} from "../../Forms/BankForm/CardUtils/CardUtils";

import { cashOutUserBalance } from "../../../actions/actionCreators/userActionCreator";

let Balance = (props) => {
    const { userBalance } = props;

    const toSubmitPaymentData = (value) => {
        props.cashOutUserBalance(value);
    };

    const { handleSubmit, pristine, submitting } = props;

    return (
        <div className={style.balance}>
            <h1 className={style.title}>
                Your balance:
                <span>${userBalance}</span>
            </h1>

            <form onSubmit={handleSubmit(toSubmitPaymentData)}>
                <div className={style.fields}>
                    <div>
                        <span>Transfer to</span>
                        <Field
                            name={"number"}
                            type={TYPE_FIELD.TEXT}
                            component={"input"}
                            normalize={formatCreditCardNumber}
                        />
                    </div>
                    <div>
                        <span>Amount</span>
                        <Field
                            name={"sum"}
                            type={TYPE_FIELD.NUMBER}
                            component={"input"}
                            normalize={formatSum(0, userBalance)}
                        />
                    </div>
                </div>
                <button type="submit" disabled={pristine || submitting} className={style.button}>
                    cash out
                </button>
            </form>
        </div>
    )
};

Balance = reduxForm({
    form: FORM.CASH_OUT,
})(Balance);

const mapStateToProps = (state) => ({
    userBalance: state.userReducer.user.balance
});
const mapDispatchToProps = dispatch => ({
    cashOutUserBalance: (formData) => dispatch(cashOutUserBalance(formData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Balance);
