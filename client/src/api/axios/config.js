import axios from 'axios';
import ACTION from '../../actions/actionTypes/actionsTypes';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import toastifyErrorMessage from '../../components/Toastify/ToastifyErrorMessage'

import { refreshToken } from '../rest/userContoller'

import { STORE, TOKEN, ERROR, SUCCESS_CODE } from '../../constants';

const responseHandler = (response) => {
    STORE.dispatch({type: ACTION.USERS_RESPONSE});

    switch (response.status) {
        case SUCCESS_CODE.CREATED: {
            toast.success(response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        }
        case SUCCESS_CODE.ACCEPTED: {
            toast.success(response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
            break;
        }
        default:
            break;
    }

    return response;
};

const requestHandler = (config) => {
    STORE.dispatch({type: ACTION.USERS_REQUEST});

    const accessToken = localStorage.getItem(TOKEN.ACCESS_TOKEN);
    if(accessToken){
        config.headers.common[TOKEN.AUTHORIZATION] = TOKEN.BEARER + accessToken;
    }
    return config;
};

const errorHandler = async (error) => {
    try {
        switch (error.response.status) {
            case ERROR.Unauthorized:
                STORE.dispatch({type: ACTION.TOKENS_ERROR});
                return await Promise.reject(error);

            case ERROR.AuthenticationTimeout:
                localStorage.removeItem(TOKEN.ACCESS_TOKEN);
                const {data: {tokenPair,  user}} = await refreshToken();

                STORE.dispatch({type: ACTION.SAVE_TOKENS_LOCALLY, tokens: tokenPair });
                STORE.dispatch({type: ACTION.USERS_RESPONSE, user});

                return axios.request();
            default:
                const { statusText, data } = error.response;
                toast.error(toastifyErrorMessage(statusText, data), {
                    position: toast.POSITION.TOP_RIGHT
                });
                return await Promise.reject(error);
        }
    } catch (err) {
        STORE.dispatch({type: ACTION.USERS_ERROR, error: err});
    }
    return await Promise.reject(error);
};



axios.interceptors.request.use(
    config => requestHandler(config),
    error => Promise.reject(error)
);


axios.interceptors.response.use(
    response => responseHandler(response),
    error => errorHandler(error)
);

export default axios;
