import React from 'react';
import connect from "react-redux/es/connect/connect";
import { Field, reduxForm, formValueSelector, getFormMeta } from 'redux-form';

import style from './BankForm.module.sass'

import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';

import { size } from 'lodash';

import { CONTEST } from '../../../constants'

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate
} from "./CardUtils/CardUtils";


let BankForm = (props) => {
    const {handleSubmit, priceOfContest , fields, number, expiry, cvc, contestNow} = props;
    const contestForms = contestNow.slice(1, size(contestNow)-1);

    const focused = (fields) => {
        let focusOnField;
        Object.keys(fields).forEach( field => {
            if(fields[field].active){
                focusOnField = field;
            }else{
                focusOnField = ''
            }
        });
        return focusOnField;
    };

    const calculateTheTotalOrder = () => {
        let total = 0;
        const theCostOfEachContest = [];

        contestForms.forEach( form => {
            const price = priceOfContest[form];
            if(price){
                total += price;
                theCostOfEachContest.push(
                    <div className={style.contestPrice} key={form}>
                        <span>{form}:</span>
                        <span>${price}</span>
                    </div>
                )
            }
        });

        return(
            <>
                <div className={style.costOfContest}>
                    {theCostOfEachContest}
                </div>
                <div className={style.total}>
                    <span>Total:</span>
                    <span>${total} USD</span>
                </div>
            </>
        )

    };

    return (
        <div className={style.container}>

            <div className={style.orderSummary}>
                <span className={style.order}>Order Summary</span>
                <div className={style.orderTotal}>
                    {calculateTheTotalOrder()}
                </div>
            </div>

            <div className={style.paymentForm}>
                <Cards
                    number={number || ''}
                    name={' '}
                    expiry={expiry || ''}
                    cvc={cvc || ''}
                    focused={focused(fields)}
                />

                <form onSubmit={handleSubmit}>
                    <Field name="number"
                           component="input"
                           type="text"
                           placeholder="Card Number"
                           normalize={formatCreditCardNumber}
                    />

                    <div className={style.expiryAndCvc}>
                        <Field name="expiry"
                               component="input"
                               type="text"
                               placeholder="Valid Thru"
                               normalize={formatExpirationDate}
                        />
                        <Field name="cvc"
                               component="input"
                               type="text"
                               placeholder="CVC"
                               normalize={formatCVC}
                        />
                    </div>

                </form>
            </div>
        </div>
    );

};

BankForm = reduxForm({
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(BankForm);

const selector = formValueSelector(CONTEST.BANKS); // <-- same as form name
const mapStateToProps = state => {
    const fields = getFormMeta(CONTEST.BANKS)(state);

    const priceOfContest = state.contestReducer.priceOfContest;
    const contestNow = state.contestReducer.contestNow;

    const {number, expiry, cvc} = selector(state, 'number','name','expiry','cvc');
    return {
        fields,

        priceOfContest,
        contestNow,

        number, expiry, cvc
    }
};
export default connect(mapStateToProps)(BankForm);
