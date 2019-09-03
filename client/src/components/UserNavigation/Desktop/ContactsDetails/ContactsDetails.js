import React from 'react';
import style from './ContactsDetails.module.sass';

function ContactsDetails(){
    return (
        <div className={style.contactsDetails}>
            <div className={style.contacts}>
                <i className="fa fa-phone"/>
                <a href={"tel:(877)355-3585"}>(877) 355-3585</a>
            </div>
        </div>
    )
}
export default ContactsDetails;
