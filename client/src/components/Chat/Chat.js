import React, { useEffect, useState } from 'react';
import connect from "react-redux/es/connect/connect";

import style from './Chat.module.sass'



import Header from "./Header/Header";




import { Field, reduxForm } from 'redux-form';

//import { toast } from 'react-toastify';

import { cloneDeep } from 'lodash'

import { socket } from "../../api/socket/chatController";

const renderNewMessage = (messages) => {
    return messages.map( (message, index) => {
        const { text, fullName} = message;
        return(
            <div className={style.messageContainer} key={index}>
                <div className={style.iconUses} />
                <div className={style.message}>
                    <span>{fullName}</span>
                    <span>{text}</span>
                </div>
            </div>
        )
    })
};

let ChatPage = (props) => {
    const [message, pushMessage] = useState([{
        id: '3',
        text: 'Hey !',
        fullName: 'Adnre Poltava'
    }]);

    const [users, setUsers] = useState(null);

    const { handleSubmit, submitting, reset, resetSection, user} = props;


    useEffect(() => {
        socket.on('connected', (msg) => console.log('msg : ', msg.text));

        /*        socket.on('connect_error', err => {
                    toast.error('socket error', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    console.log('Socket err:', err);
                })*/
    });

    useEffect(() => {
        socket.on('new message', (msg) => {
            const newMessages = cloneDeep(message);
            newMessages.push(msg);

            pushMessage(newMessages)
        });
    });

    const submit = (values) =>{
        console.log('submit', values);

        if(values.message){
            socket.emit('msg', {
                date: Date.now(),
                id: user.id,
                fullName: `${user.firstName} ${user.lastName}`,
                text: values.message
            });
        }

        return reset()
    };



    useEffect(() => {
        socket.on('finded user', users => {
            setUsers(users)
        })
    });

    const showFindedUsers = (users) => {
        return users.map( user => {
            return(
                <div key={user.id}>
                    {user.firstName}{user.lastName}
                </div>
            )
        })
    };

    return (
        <>
            <div className={style.chatContainer}>

                    <Field name={'users'}
                           component={Header}
                           type={'text'}
                           placeholder="Search"
                           resetField={resetSection}
                    />

                {users && showFindedUsers(users)}
                {
                    !users &&
                    <div className={style.allMessage}>
                        {renderNewMessage(message)}
                    </div>
                }
                <form onSubmit={handleSubmit(submit)}>
                    <Field name={'message'}
                           component={'input'}
                           type={'text'}
                           placeholder="Write a message..."
                    />
                    <button type="submit" disabled={submitting}>
                        <i className="fas fa-paper-plane" />
                    </button>
                </form>
            </div></>
    )
};

ChatPage = reduxForm ({
    form: 'chat',
})(ChatPage);

const mapStateToProps = (state) => ({
    user: state.userReducers.user,
});
const mapDispatchToProps = dispatch => ({
    clearField: field => dispatch('chat', field, ''),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);


