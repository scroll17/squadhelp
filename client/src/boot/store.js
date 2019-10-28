import React from 'react';
import { Provider } from 'react-redux';
import App from '../App';

import { toast } from 'react-toastify';

import { STORE } from '../constants';

toast.configure({
    autoClose: 2000,
    closeOnClick: true
});

function Store(){
  return (
      <Provider store={ STORE }>
        <App />
      </Provider>
  );
}
export default Store;
