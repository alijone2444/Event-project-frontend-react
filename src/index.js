import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootreducer from './ReduxStore/reducers/rootreducer';

const root = ReactDOM.createRoot(document.getElementById('root'));
const Store = createStore(rootreducer)
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
