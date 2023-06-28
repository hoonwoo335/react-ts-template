import * as React from 'react';
import ReactDOM from 'react-dom';

// react router v6
import { BrowserRouter } from "react-router-dom";
// react redux
import { Provider } from 'react-redux';
//import { createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/modules';

// root components
import App from './components/App';

// store load
const store = configureStore({reducer: rootReducer});
//console.log(store.getState());

// production build에서는 콘솔로그 지우기 (웹팩에서 하지않고 코드로도 가능)
//if (process.env.NODE_ENV === "production") {
//  console.log = function no_console() {};
//  console.warn = function no_console() {};
//}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  
  document.getElementById('app') as HTMLElement
);